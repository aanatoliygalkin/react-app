// AddFavoriteButton.tsx
import styles from './AddFavoriteButton.module.css';
import React from 'react';
import cn from 'classnames';

export interface AddFavoriteButtonProps {
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    className?: string;
    isFavorite: boolean;
}

function AddFavoriteButton({
    onClick,
    className = '',
    isFavorite = false
}: AddFavoriteButtonProps) {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        e.preventDefault();
        onClick(e);
    };

    return (
        <button
            onClick={handleClick}
            className={cn(
                styles['add-favorite-button'],
                className, {
                    [styles['in-favorite']]: isFavorite
                }
            )}
            type="button"
        >
            {isFavorite ? <>В избранном</> : <>В избранное</>}
        </button>
    );
}

export default AddFavoriteButton;