import React from 'react';

function Post({ id, title, url }) {

  return (
    <div className='p-3 image'>
      <div className='flex justify-center'>
        <img
          className='w-5/6 h-44 shadow-lg'
          key={id}
          src={url}
          alt={title}></img>
      </div>
      <p className='text-xs text-center'>{title}</p>
    </div>
  );
}

export default Post;