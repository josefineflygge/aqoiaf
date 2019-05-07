import React from 'react'

const BattlePostDetail = (props) => {

    const id = props.id;

  return (
    <div>
        <p>Title - {id}</p>
      <p>About Battle</p>
      <p>Image</p>
      <p>People in battle</p>
      <p>etc</p>
    </div>
  )
}

export default BattlePostDetail;
