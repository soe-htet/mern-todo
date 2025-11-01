import Todo from "../models/Todo.js";

export const createTodo = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || !text.trim())
      return res.status(400).json({ error: "Text is required" });

    const todo = await Todo.create({ text: text.trim() });
    return res.status(200).json(todo);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

export const getToDos = async (req, res) => {
  try {
    const todos = await Todo.find({}).sort({ createdAt: -1 });
    return res.json(todos);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

export const toggleTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ error: "not found" });
    }
    todo.done = !todo.done;
    await todo.save();
    return res.status(200).json(todo);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Todo.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ error: "not found" });
    }

    return res.status(200).json({ message: "deleted ok" });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
