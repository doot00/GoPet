import { Store } from './types/store';
import styles from './detail.module.css';
import Image from 'next/image';

type Props = {
    currentStore?: Store;
    expanded: boolean;
}

const DetailSection = ({ currentStore, expanded }: Props) => {
    if (!currentStore) return null;
    return (
        <div className={`${styles.detailContent} ${expanded ? styles.expanded : ''}`}>
            <div className={styles.images}>
                {currentStore.images.slice(0, 3).map((image, i) => (
                    <div key={i} style={{ position: 'relative', maxWidth: 120, height: 80 }}>
                        <Image
                            src={image}
                            alt=""
                            style={{ objectFit: 'cover' }}
                            unoptimized={true}
                            placeholder="blur"
                            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO0WhFsDwADzwF2mLYSJgAAAABJRU5ErkJggg=="
                        />
                    </div>
                ))}
            </div>
            {expanded && (
                <>
                    <div className={styles.description}>
                        <h2>설명</h2>
                        <p>{currentStore.description}</p>
                    </div>
                </>
            )}
        </div>
    )
}

export default DetailSection;