import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function RichText({ value, onChange }) {
  const modules = {
    toolbar: [
       [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ color: [] }, { background: [] }],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "color",
    "background",
    "link",
    "image",
  ];

  return (
    <div>
      <ReactQuill
        theme="snow"
        value={value}     
        onChange={onChange} 
        modules={modules}
        formats={formats}
        placeholder="Type something..."
        className="custom-quill-editor"
      />
    </div>
  );
}
