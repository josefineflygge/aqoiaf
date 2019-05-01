import React from 'react'

const CharacterPostDetail = (props) => {


    const id = props.match.params.id;

  return (
    <div>
        <p>Title - {id}</p>
      <p>About Person</p>
      <p>Image</p>
      <p>Related people</p>
      <p>etc</p>
    </div>
  )
}

export default CharacterPostDetail
