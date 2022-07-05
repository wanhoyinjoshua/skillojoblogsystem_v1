
import logo from './logo.svg';
import './App.css';
import isHotkey from 'is-hotkey'
import imageExtensions from 'image-extensions'
import isUrl from 'is-url'
import { BaseEditor, Descendant,Range,Transforms, Editor,Element as SlateElement, } from 'slate'
import { ReactEditor, RenderElementProps,useSlate,RenderLeafProps,useSlateStatic} from 'slate-react'
// Import React dependencies.
import React, { useState,useCallback,useMemo, Children,useEffect,useRef } from 'react'
// Import the Slate editor factory.
import { createEditor } from 'slate'
import { HistoryEditor, withHistory } from 'slate-history'
import { Toolbar , Button,Icon} from './components/components';

// Import the Slate components and React plugin.
import { Slate, Editable, withReact,useSelected,
  useFocused } from 'slate-react'
import { json } from 'stream/consumers';
import { css } from '@emotion/css'

import  {InsertImageimproved} from "../src/components/imagelocalupload"
import  {InsertVideoimproved} from "../src/components/videolocalupload"
import {SubmitButton} from "../src/components/submit"







type CustomElement =
  | BlockQuoteElement
  | BulletedListElement
  | CheckListItemElement
  | EditableVoidElement
  | HeadingElement
  | HeadingTwoElement
  | ImageElement
  |VideoElement
  | LinkElement
  | ButtonElement
  | ListItemElement
  | MentionElement
  | ParagraphElement

  | TableCellElement
  | TitleElement
  | VideoElement

export type CustomText = {
  bold?: boolean
  italic?: boolean
  code?: boolean
  text: string
}



const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify']
const LIST_TYPES = ['numbered-list', 'bulleted-list']

export type BlockQuoteElement = {
  type: 'block-quote'
  align?: string
  children: Descendant[]
}

export type BulletedListElement = {
  type: 'bulleted-list'
  align?: string
  children: Descendant[]
}

export type CheckListItemElement = {
  type: 'check-list-item'
  checked: boolean
  children: Descendant[]
}

export type EditableVoidElement = {
  type: 'editable-void'
  children: EmptyText[]
}

export type HeadingElement = {
  type: 'heading'
  align?: string
  children: Descendant[]
}

export type HeadingTwoElement = {
  type: 'heading-two'
  align?: string
  children: Descendant[]
}

export type ImageElement = {
  type: 'image'
  url: string
  children: EmptyText[]
}
export type VideoElement = {
  type: 'video'
  url: string
  children: EmptyText[]
}

export type LinkElement = { type: 'link'; url: string; children: Descendant[] }

export type ButtonElement = { type: 'button'; children: Descendant[] }

export type ListItemElement = { type: 'list-item'; children: Descendant[] }

export type MentionElement = {
  type: 'mention'
  character: string
  children: CustomText[]
}

export type ParagraphElement = {
  type: 'paragraph'
  align?: string
  children: Descendant[]
}



export type TableCellElement = { type: 'table-cell'; children: CustomText[] }



export type TitleElement = { type: 'title'; children: Descendant[] }



declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor
    Element: CustomElement
    Text: CustomText 
  }
}



const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
}


type slateprops ={
  value: Descendant[],
  id:string ,
  author: string,
   title:string
}


export default function Slatejs(props:slateprops) {

  // const [data , setData] = useState<Descendant[]>()
  // const [highlight , sethighlight] = useState<Range>()

  const editor = useMemo(
    () => withVideo(withImages(withHistory(withReact(createEditor())))),
    []
  )



  

 

  

  // function onChange = ({ value }){
  //   setData({ value })
  // }


const renderElement = useCallback(props => <Element {...props} />, [])
const renderLeaf = useCallback(props => <Leaf {...props} />, [])

  
    return (
      // Add the editable component inside the context.
      <>
     
      <Slate  
      editor={editor} 
      value={props.value}  
      onChange={value => {
        const isAstChange = editor.operations.some(
          op => 'set_selection' !== op.type
        )
        if (isAstChange) {
          // Save the value to Local Storage.
          const content = JSON.stringify(value)
          localStorage.setItem('content', content)
        }
      }}
      
      
      
      
      > 
        
        <Toolbar>

        <MarkButton format="bold" icon="format_bold" />
        <MarkButton format="italic" icon="format_italic" />
        <MarkButton format="underline" icon="format_underlined" />
        <MarkButton format="code" icon="code" />
        <BlockButton format="heading-one" icon="looks_one" />
        <BlockButton format="heading-two" icon="looks_two" />
        <BlockButton format="block-quote" icon="format_quote" />
        <BlockButton format="numbered-list" icon="format_list_numbered" />
        <BlockButton format="bulleted-list" icon="format_list_bulleted" />
        <BlockButton format="left" icon="format_align_left" />
        <BlockButton format="center" icon="format_align_center" />
        <BlockButton format="right" icon="format_align_right" />
        <BlockButton format="justify" icon="format_align_justify" />
        <InsertImageButton />
        <InsertImageimproved/>
        <InsertVideoimproved/>
        <SubmitButton id={props.id} author={props.author} title={props.title} ></SubmitButton>

        </Toolbar>
      
         
        



        
        <Editable 


        
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        
        
        
        
        spellCheck
        autoFocus
        onKeyDown={event => {
          for (const hotkey in HOTKEYS) {
            if (isHotkey(hotkey, event as any)) {
              event.preventDefault()
              const mark = HOTKEYS[hotkey]
              toggleMark(editor, mark)
            }
          }
        }}
  
        
        
        />
      </Slate>
      {/* {JSON.stringify(data)}
      <br></br>

      {JSON.stringify(highlight)} */}
      </>
    )


  }

  const toggleBlock = (editor, format) => {
    const isActive = isBlockActive(
      editor,
      format,
      TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type'
    )
    const isList = LIST_TYPES.includes(format)
  
    Transforms.unwrapNodes(editor, {
      match: n =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        LIST_TYPES.includes(n.type) &&
        !TEXT_ALIGN_TYPES.includes(format),
      split: true,
    })
    let newProperties: Partial<SlateElement>
    if (TEXT_ALIGN_TYPES.includes(format)) {
      newProperties = {
        align: isActive ? undefined : format,
      }
    } else {
      newProperties = {
        type: isActive ? 'paragraph' : isList ? 'list-item' : format,
      }
    }
    Transforms.setNodes<SlateElement>(editor, newProperties)
  
    if (!isActive && isList) {
      const block = { type: format, align:format, children: [] }
      Transforms.wrapNodes(editor, block)
    }
  }
  
  const toggleMark = (editor, format) => {
    const isActive = isMarkActive(editor, format)
  
    if (isActive) {
      Editor.removeMark(editor, format)
    } else {
      Editor.addMark(editor, format, true)
    }
  }
  
  const isBlockActive = (editor, format, blockType = 'type') => {
    const { selection } = editor
    if (!selection) return false
  
    const [match] = Array.from(
      Editor.nodes(editor, {
        at: Editor.unhangRange(editor, selection),
        match: n =>
          !Editor.isEditor(n) &&
          SlateElement.isElement(n) &&
          n[blockType] === format,
      })
    )
  
    return !!match
  }
  
  const isMarkActive = (editor, format) => {
    const marks = Editor.marks(editor)
    return marks ? marks[format] === true : false
  }
  
  const Element = ({ attributes, children, element }) => {
    const style = { textAlign: element.align }
    const props= { attributes, children, element }
    switch (element.type) {
      case 'block-quote':
        return (
          <blockquote style={style} {...attributes}>
            {children}
          </blockquote>
        )
        case 'image':
        return  <Image {...props} />
        case 'video':
        return  <Video {...props} />
      case 'bulleted-list':
        return (
          <ul style={style} {...attributes}>
            {children}
          </ul>
        )
      case 'heading-one':
        return (
          <h1 style={style} {...attributes}>
            {children}
          </h1>
        )
      case 'heading-two':
        return (
          <h2 style={style} {...attributes}>
            {children}
          </h2>
        )
      case 'list-item':
        return (
          <li style={style} {...attributes}>
            {children}
          </li>
        )
      case 'numbered-list':
        return (
          <ol style={style} {...attributes}>
            {children}
          </ol>
        )
      default:
        return (
          <p style={style} {...attributes}>
            {children}
          </p>
        )
    }
  }
  
  const Leaf = ({ attributes, children, leaf }) => {
    if (leaf.bold) {
      children = <strong>{children}</strong>
    }
  
    if (leaf.code) {
      children = <code>{children}</code>
    }
  
    if (leaf.italic) {
      children = <em>{children}</em>
    }
  
    if (leaf.underline) {
      children = <u>{children}</u>
    }
  
    return <span {...attributes}>{children}</span>
  }
  
  const BlockButton = ({ format, icon }) => {
    const editor = useSlate()
    return (
      <Button
        active={isBlockActive(
          editor,
          format,
          TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type'
        )}
        onMouseDown={event => {
          event.preventDefault()
          toggleBlock(editor, format)
        }}
      >
        <Icon>{icon}</Icon>
      </Button>
    )
  }
  
  const MarkButton = ({ format, icon }) => {
    const editor = useSlate()
    return (
      <Button
        active={isMarkActive(editor, format)}
        onMouseDown={event => {
          event.preventDefault()
          toggleMark(editor, format)
        }}
      >
        <Icon>{icon}</Icon>
      </Button>
    )
  }
  

  const InsertImageButton = () => {
    const editor = useSlateStatic()
    
    
    return (
      <Button
        onMouseDown={event => {
          event.preventDefault()
          const url = window.prompt("url")
          
         
          //need to figure out a way to save the file to a s3 database and then save the url and then 
          // it there easy peasy .....
          if (url && !isImageUrl(url)) {
            alert('URL is not an image')
            return
          }
          insertImage(editor, url)
        }}
      >
        <input
        style={{display: 'none'}}
       
        
        type="file"
       
      />
        <Icon>image</Icon>
      </Button>
    )
  }




  
  


  const isImageUrl = url => {
    if (!url) return false
    if (!isUrl(url)) return false
    const ext = new URL(url).pathname.split('.').pop()
    return imageExtensions.includes(ext)
  }

  export type EmptyText = {
    text: string
    
  }

  const withImages = editor => {
    const { insertData, isVoid } = editor
  
    editor.isVoid = element => {
      return element.type === 'image' ? true : isVoid(element)
    }
  
    editor.insertData = data => {
      const text = data.getData('text/plain')
      const { files } = data
  
      if (files && files.length > 0) {
        for (const file of files) {
          const reader = new FileReader()
          const [mime] = file.type.split('/')
  
          if (mime === 'image') {
            reader.addEventListener('load', () => {
              const url = reader.result
              insertImage(editor, url)
            })
  
            reader.readAsDataURL(file)
          }
        }
      } else if (isImageUrl(text)) {
        insertImage(editor, text)
      } else {
        insertData(data)
      }
    }
  
    return editor
  }



  const withVideo = editor => {
    const { insertData, isVoid } = editor
  
    editor.isVoid = element => {
      return element.type === 'video' ? true : isVoid(element)
    }
  
    editor.insertData = data => {
      const text = data.getData('text/plain')
      const { files } = data
  
      if (files && files.length > 0) {
        for (const file of files) {
          const reader = new FileReader()
          const [mime] = file.type.split('/')
  
          if (mime === 'video') {
            reader.addEventListener('load', () => {
              const url = reader.result
              insertVideo(editor, url)
            })
  
            reader.readAsDataURL(file)
          }
        }
      } else if (isImageUrl(text)) {
        insertVideo(editor, text)
      } else {
        insertData(data)
      }
    }
  
    return editor
  }























  
   export const insertImage = (editor, url) => {
    
    const text = { text: '' }
    const image: ImageElement = { type: 'image', url, children: [text] }
    Transforms.insertNodes(editor, image)
  }
  export const insertVideo = (editor, url) => {
    
    const text = { text: '' }
    const video: VideoElement = { type: 'video', url, children: [text] }
    Transforms.insertNodes(editor, video)
  }

  const Image = ({ attributes, children, element }) => {
    const editor = useSlateStatic()
    const path = ReactEditor.findPath(editor, element)
  
    const selected = useSelected()
    const focused = useFocused()
    return (
      <div {...attributes}>
        {children}
        <div
          contentEditable={false}
          className={css`
            position: relative;
            display:block;
            
            
          `}
        >
          <img
            src={element.url}
            className={css`
              display: block;
              max-width: 100%;
              max-height: 30em;
              margin:0 auto;
              box-shadow: ${selected && focused ? '0 0 0 3px #B4D5FF' : 'none'};
            `}
          />
          <Button
            active
            onClick={() => Transforms.removeNodes(editor, { at: path })}
            className={css`
              display: ${selected && focused ? 'inline' : 'none'};
              position: absolute;
              top: 0.5em;
              left: 0.5em;
              background-color: white;
            `}
          >
            <Icon>delete</Icon>
          </Button>
        </div>
      </div>
    )
  }




  const Video = ({ attributes, children, element }) => {
    const editor = useSlateStatic()
    const path = ReactEditor.findPath(editor, element)
  
    const selected = useSelected()
    const focused = useFocused()
    return (
      <div {...attributes}>
        {children}
        <div
          contentEditable={false}
          className={css`
            position: relative;
            display:block;
            
            
          `}
        >
          <video controls
            src={element.url}
            className={css`
              display: block;
              max-width: 100%;
              max-height: 30em;
              margin:0 auto;
              box-shadow: ${selected && focused ? '0 0 0 3px #B4D5FF' : 'none'};
            `}
          />
          <Button
            active
            onClick={() => Transforms.removeNodes(editor, { at: path })}
            className={css`
              display: ${selected && focused ? 'inline' : 'none'};
              position: absolute;
              top: 0.5em;
              left: 0.5em;
              background-color: white;
            `}
          >
            <Icon>delete</Icon>
          </Button>
        </div>
      </div>
    )
  }

 

  
  

