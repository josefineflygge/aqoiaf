import React from 'react'

const HousePostDetail = (props) => {


    const id = props.match.params.id;

  return (
    <div>
        <p>Title - {id}</p>
      <p>About House</p>
      <p>Image</p>
      <p>People from house</p>
      <p>etc</p>
    </div>
  )
}

export default HousePostDetail;
