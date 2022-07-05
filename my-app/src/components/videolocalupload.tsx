import { ReactEditor, RenderElementProps,useSlate,RenderLeafProps,useSlateStatic} from 'slate-react'
import {insertVideo} from "../slate"
export const InsertVideoimproved = () => {
    const editor = useSlateStatic()
    const changeHandler = async (event) => {
		const url2 = window.URL.createObjectURL(event.target.files[0]);
    console.log(event.target.files[0])
    console.log(url2)
    insertVideo(editor, url2)
    var url= url2.split("blob:")
    console.log(url)
    let blob = await fetch(`${url2}`).then(r => r.arrayBuffer());
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
