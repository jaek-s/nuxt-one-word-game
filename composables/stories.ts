import {
    addDoc,
    collection,
    doc,
    deleteDoc,
    query,
    where,
    Timestamp,
} from "firebase/firestore";
import type { FirestoreDataConverter, FieldValue } from "firebase/firestore";

/* -------------------------------------------------------------------------- */
/*                                   Private                                  */
/* -------------------------------------------------------------------------- */

type MaybeRefString = Ref<string | undefined> | string | undefined;

const cleanSourceData = (sourceData: object, destination: object) =>
    Object.entries(sourceData).reduce(
        (accumulator: Record<any, any>, [key, value]: [any, any]) => {
            if (!Object.hasOwn(destination, key)) {
                return accumulator;
            }

            accumulator[key] = value;
            return accumulator;
        },
        {}
    );

class Story {
    id?: string;
    owner = "";
    name = "";
    sharedWith: string[] = [];

    constructor(sourceData: object = {}) {
        Object.assign(this, cleanSourceData(sourceData, this));
    }
}

class StoryWord {
    id?: string;
    created: Timestamp | FieldValue = Timestamp.now();
    author = "";
    content = "";

    constructor(sourceData: object = {}) {
        Object.assign(this, cleanSourceData(sourceData, this));
    }
}

const storyDataConverter: FirestoreDataConverter<Story> = {
    toFirestore: (data) => ({ ...new Story(data) }),
    fromFirestore: (snapshot) => new Story({ ...snapshot.data(), id: snapshot.id }),
};

const storyWordDataConverter: FirestoreDataConverter<StoryWord> = {
    toFirestore: (data) => ({ ...new StoryWord(data) }),
    fromFirestore: (snapshot) => new StoryWord({ ...snapshot.data(), id: snapshot.id }),
};

const getStoriesCollection = () =>
    collection(useFirestore(), "stories").withConverter(storyDataConverter);

const getStoryDoc = (storyId: MaybeRefString) =>
    doc(getStoriesCollection(), ref(storyId).value).withConverter(storyDataConverter);

/* -------------------------------------------------------------------------- */
/*                                   public                                   */
/* -------------------------------------------------------------------------- */

/**
 * Returns a function that can be used to create a story in firebase
 * @returns function
 */
export const useCreateStory = () => (storyName: string) => {
    /**
     * The storyDataConverter will automatically add any missing fields to this object,
     * so we can safely say it's of type Story, even though it's missing fields
     */
    const newStory = {
        owner: useCurrentUser().value?.uid,
        name: storyName,
    } as Story;

    addDoc(getStoriesCollection(), newStory);
};

/**
 * Returns a function that can be used to delete a story in firebase
 * @returns function
 */
export const useDeleteStory = () => (storyId: MaybeRefString) =>
    deleteDoc(getStoryDoc(storyId));

/**
 * Returns a reactive list of stories the current user has access to
 * @returns Story[]
 */
export const useStoryList = () =>
    useCollection(
        query(getStoriesCollection(), where("owner", "==", useCurrentUser().value?.uid))
    );

/**
 * Returns a reactive instance of a story
 * @param storyId ID of the story to get
 * @returns Story
 */
export const useSingleStory = (storyId: MaybeRefString) =>
    useDocument(getStoryDoc(storyId));

/**
 * Returns a reactive list of words for a specific story
 * @param storyId ID of the story to get words for
 * @returns StoryWord[]
 */
export const useStoryWords = (storyId: MaybeRefString) =>
    useCollection<StoryWord>(
        collection(getStoryDoc(storyId), "words").withConverter(storyWordDataConverter)
    );
