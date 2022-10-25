import React from 'react'
import TextArea from './TextArea'

const TextInputs = () => {
  return (
    <>
        <input type="text" placeholder="Title" />
        <input type="text" placeholder="Description (optional)" />
        <TextArea />
    </>
  )
}

export default TextInputs