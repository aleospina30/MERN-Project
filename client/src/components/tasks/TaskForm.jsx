
export function TaskForm() {
    const handleSubmit = (e) => {
        e.preventDefault();
    }

  return (
    <form onSubmit={handleSubmit}>
        <input type="text" name="title" />
        <button>Add</button>
    </form>
  )
}
