import { addDoc, collection } from "firebase/firestore";
import { defineStore } from "pinia";

export interface Story {
    owner: string;
    name: string;
}

export const useStoryStore = defineStore("stories", () => {
    /* --------------------------------- private -------------------------------- */
    const db = useFirestore();
    const firestoreStories = collection(db, "stories");
    const user = useCurrentUser();

    /* --------------------------------- public --------------------------------- */
    const stories = ref(useCollection<Story>(firestoreStories));
    const addStory = (name: string) => {
        if (!user.value) {
            throw new Error("You must be logged in to create a new story.");
        }

        addDoc(firestoreStories, {
            owner: user.value.uid,
            name,
        });
    };

    return { stories, addStory };
});
