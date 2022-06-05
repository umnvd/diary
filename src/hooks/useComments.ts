import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { commentsService } from '../data/CommentsService';
import Comment from '../models/Comment';
import { currentUser } from '../models/User';
import { error, loading, setError, setSuccess, success } from '../toast/Toast';

function useComments(postId: number) {
    const [comments, setComments] = useState<Comment[]>([]);

    const sendComment = (commentText: string) => {
        const id = loading('Добавление комментария');
        commentsService.addComment(
            {
                id: 0,
                postId: postId,
                user: currentUser,
                body: commentText
            })
            .then(comment => setComments([...comments, comment]))
            .then(() => setSuccess(id, 'Комментарий добавлен'))
            .catch(() => setError(id, 'Ошибка добавления комментария'));
    }

    const deleteComment = (comment?: Comment) => {
        if (!comment) return;
        const id = loading('Удаление комментария');
        commentsService.deleteComment(comment.id)
            .then(() => setComments(comments.filter(c => c.id !== comment.id)))
            .then(() => setSuccess(id, 'Комментарий удален'))
            .catch(() => setError(id, 'Ошибка добавления комментария'));
    }

    useEffect(() => {
        const id = loading('Загрузка комментариев');
        commentsService.getComments(postId)
            .then(setComments)
            .then(() => setSuccess(id, 'Комментарии загружены'))
            .catch(() => setError(id, 'Ошибка загрузки комментариев'));
    }, [postId])

    return {
        comments,
        sendComment,
        deleteComment
    };
}

export default useComments;