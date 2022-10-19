import React, { useState } from 'react'
import SortableListItem from './SortableListItem';
import "./SortableList.css"

function SortableList({data, onDropItem, onClickItem, renderItem}) {
  const [startIndex, setstartIndex] = useState(0);
  const [listData, setlistData] = useState(data);

  const onDragStart = (index) => setstartIndex(index)
  const onDrop = (dropIndex) => {
    const dragItem = listData[startIndex]
    const list = [...listData];
    list.splice(startIndex, 1)

    const newListData = startIndex < dropIndex
      ? [...list.slice(0, dropIndex-1), dragItem, ...list.slice(dropIndex-1, list.length)]
      : [...list.slice(0, dropIndex), dragItem, ...list.slice(dropIndex, list.length)]
  }

  return(
    <ul className='sortable-list'>
      {listData.map((item, index)=>(
        <SortableListItem
          key={index}
          index={index}
          draggable={true}
          onDropItem={onDrop}
          onDragStart={onDragStart}
          onClickItem={onClickItem}
        >
          {renderItem(item, index)}
        </SortableListItem>
      ))}
      <SortableListItem
        key={listData.length}
        index={listData.length}
        draggable={false}
        onDropItem={onDrop}
        onDragStart={onDragStart}
        onClickItem={onClickItem}
      />
    </ul>
  )
}

export default SortableList