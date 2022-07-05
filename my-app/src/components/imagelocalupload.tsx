import { ReactEditor, RenderElementProps,useSlate,RenderLeafProps,useSlateStatic} from 'slate-react'
import {insertImage} from "../slate"
export const InsertImageimproved = () => {
    const editor = useSlateStatic()
    const changeHandler = async (event) => {
		const url = URL.createObjectURL(event.target.files[0]);
        
        insertImage(editor, url)
        let blob = await fetch(url).then(r => r);
        console.log(blob)
		
	};
    return (
      <input

      type='file'

      onChange={changeHandler}
       
      >
        
        
      </input>
    )
  }
