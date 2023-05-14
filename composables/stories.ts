import {
    addDoc,
    collection,
    doc,
    deleteDoc,
    query,
    where,
    Timestamp,
    serverTimestamp,
} from "firebase/firestore";
import type { FirestoreDataConverter, FieldValue } from "firebase/firestore";

/* -------------------------------------------------------------------------- */
/*                                   Private                                  */
/* -------------------------------------------------------------------------- */

type MaybeRefString = Ref<string | undefined> | string | undefined;

abstract class FirestoreRecord {
    id = "";
    data: Record<string, unknown> = {};

    constructor(id?: string) {
        if (id) {
            this.id = id;
        }
    }
}

class Story extends FirestoreRecord {
    data = {
        owner: "",
        name: "",
        sharedWith: [] as string[],
    };

    constructor(sourceData: object = {}, id?: string) {
        super(id);
        Object.assign(this.data, sourceData);

        console.debug(sourceData, this.data);
    }
}

class StoryWord extends FirestoreRecord {
    id = "";
    data = {
        created: Timestamp.now() as Timestamp | FieldValue,
        author: "",
        content: "",
    };

    constructor(sourceData: object = {}, id?: string) {
        super(id);
        Object.assign(this.data, sourceData);
    }
}

const getDataConverter = <T extends FirestoreRecord>(
    RecordType: new (data?: Record<string, unknown>, id?: string) => T
): FirestoreDataConverter<T> => ({
    toFirestore: (newRecord: T) =>
        Object.entries(new RecordType().data).reduce(
            (accumulator: Record<any, any>, [key, defaultValue]: [string, any]) => {
                accumulator[key] = newRecord.data[key] ?? defaultValue;
                return accumulator;
            },
            {}
        ),
    fromFirestore: (snapshot) => new RecordType(snapshot.data(), snapshot.id),
});

const getCurrentUserId = () => {
    const uid = useCurrentUser().value?.uid;

    if (!uid) {
        throw new Error("must be logged in");
    }

    return uid;
};

const getStoriesCollection = () =>
    collection(useFirestore(), "stories").withConverter(getDataConverter<Story>(Story));

const getStoryDoc = (storyId: MaybeRefString) =>
    doc(getStoriesCollection(), ref(storyId).value).withConverter(
        getDataConverter<Story>(Story)
    );

const getStoryWordCollection = (storyId: MaybeRefString) =>
    collection(getStoryDoc(storyId), "words").withConverter(
        getDataConverter<StoryWord>(StoryWord)
    );

/* -------------------------------------------------------------------------- */
/*                                   public                                   */
/* -------------------------------------------------------------------------- */

/**
 * Returns a reactive list of stories the current user owns
 * @returns Story[]
 */
export const useOwnedStoryList = () =>
    useCollection(
        query(getStoriesCollection(), where("owner", "==", getCurrentUserId()))
    );

/**
 * Returns a reactive list of stories shared with the current user
 * @returns Story[]
 */
export const useSharedStoryList = () =>
    useCollection(
        query(getStoriesCollection(), where(getCurrentUserId(), "in", "sharedWith"))
    );

/**
 * Returns a reactive instance of a story
 * @param storyId ID of the story to get
 * @returns Story
 */
export const useSingleStory = (storyId: MaybeRefString) =>
    useDocument(getStoryDoc(storyId));

/**
 * Returns a function that can be used to create a story in firebase
 * @returns function
 */
export const useCreateStory = () => (storyName: string) => {
    /**
     * The storyDataConverter will automatically add any missing fields to this object,
     * so we can safely say it's of type Story, even though it's missing fields
     */

    return addDoc(
        getStoriesCollection(),
        new Story({
            owner: getCurrentUserId(),
            name: storyName,
        })
    );
};

/**
 * Returns a function that can be used to delete a story in firebase
 * @returns function
 */
export const useDeleteStory = () => (storyId: MaybeRefString) =>
    deleteDoc(getStoryDoc(storyId));

/**
 * Returns a reactive list of words for a specific story
 * @param storyId ID of the story to get words for
 * @returns StoryWord[]
 */
export const useStoryWords = (storyId: MaybeRefString) =>
    useCollection<StoryWord>(getStoryWordCollection(storyId));

export const useCreateStoryWord =
    () => (storyId: MaybeRefString, wordContent: MaybeRefString) =>
        addDoc(
            getStoryWordCollection(storyId),
            new StoryWord({
                created: serverTimestamp(),
                author: getCurrentUserId(),
                content: ref(wordContent).value,
            })
        );
