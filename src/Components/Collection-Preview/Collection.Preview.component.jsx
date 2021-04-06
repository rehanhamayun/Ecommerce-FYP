import React from 'react';
import CollectionItems from '../Collection Items/Collection-items.component';
import './Collectio.Preview.styles.scss';

const CollectionPreview = ({title , items}) => (
    <div className="collection-preview">
        <h1 className = "title">{title.toUpperCase()}</h1>
        <div className="preview">
        {items.filter((item, i) => i<4).map(item => (
            <CollectionItems key={item.id} item={item} />
        ))}
        </div>

        
    </div>
)

export default CollectionPreview;