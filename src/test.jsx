import { useState } from "react";

function SimpleForm() {
  const [input, setInput] = useState('');
  const formSubmit = (e) => {
    e.preventDefault();
    alert(input);
    setInput('');
  }
  return (
    <form onSubmit={formSubmit}>
      <input value={input} onChange={setInput(input)} type="text" />
      <button>Отправить</button>
    </form>
  );
}