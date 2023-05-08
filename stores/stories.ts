import { addDoc, collection, doc, deleteDoc, query, where } from "firebase/firestore";
import { defineStore } from "pinia";

export interface Story {
    owner: string;
    name: string;
}

export const useStoryStore = defineStore("stories", () => {
    /* --------------------------------- private -------------------------------- */
    const user = useCurrentUser();

    if (!user.value) {
        throw new Error("You must be logged in to access stories.");
    }

    const db = useFirestore();
    const firestoreStoriesCollection = collection(db, "stories");
    const firestoreQueriedStories = query(
        firestoreStoriesCollection,
        where("owner", "==", user.value.uid)
    );

    /* --------------------------------- public --------------------------------- */
    const stories = useCollection<Story>(firestoreQueriedStories);

    const addStory = (name: string) => {
        addDoc(firestoreStoriesCollection, {
            owner: user.value?.uid,
            name,
        });
    };

    const deleteStory = (id: string) => {
        deleteDoc(doc(db, "stories", id));
    };

    return { stories, addStory, deleteStory };
});
