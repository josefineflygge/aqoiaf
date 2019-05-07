import React from 'react'

const BattlePostDetail = (props) => {

    const name = props.match.params.name;

  return (
    <div>
        <p>Title - {name}</p>
        <p>Content</p>
    </div>
  )
}

export default BattlePostDetail;
