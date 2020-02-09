export interface Communication {
    key: string;
    title: string;
    description: string;
    imagePath?: string;
    account?: string;
    uploadedByUid: string;
    uploadedBy?: string;
    uploadedByPhotoURL?: string;
    views: [];
    viewsCount: number;
    likes: [];
    likesCount: number;
    dislikes: [];
    dislikesCount: number;
    uploadedDate: Date;
}