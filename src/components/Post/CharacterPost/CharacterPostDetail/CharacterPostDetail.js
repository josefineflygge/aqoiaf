import React from 'react'

const CharacterPostDetail = (props) => {

    const id = props.match.params.id;

  return (
    <div>
        <p>Title - {id}</p>
        <p>Content</p>
    </div>
  )
}

export default CharacterPostDetail
