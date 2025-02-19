export async function fetchInterviewQuestions(jobId: string, difficulty: string, category: string) {
    try {
        const response = await fetch(`/api/questions?jobId=${jobId}&difficulty=${difficulty}&category=${category}`);
        if (!response.ok) {
            throw new Error("Failed to fetch interview questions");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching interview questions:", error);
        return { success: false, error: "Unable to fetch questions" };
    }
}

export async function getUserData(userId: string) {
    try {
        const response = await fetch(`/api/user?userId=${userId}`);
        if (!response.ok) {
            throw new Error("Failed to fetch user data");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching user data:", error);
        return { success: false, error: "Unable to fetch user data" };
    }
}
