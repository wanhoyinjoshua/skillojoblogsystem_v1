import { ReactEditor, RenderElementProps,useSlate,RenderLeafProps,useSlateStatic} from 'slate-react'
import {insertVideo} from "../slate"
export const InsertVideoimproved = () => {
    const editor = useSlateStatic()
    const changeHandler = async (event) => {
		const url = URL.createObjectURL(event.target.files[0]);
        
        insertVideo(editor, url)
        let blob = await fetch(url).then(r => r.blob());
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
