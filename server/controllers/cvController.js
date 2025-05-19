import CV from '../models/CV.js';

export const getUserCVs = async (req, res) => {
  try {
    const cvs = await CV.findAll({ where: { userId: req.userId } });
    res.json(cvs);
  } catch (e) {
    res.status(500).json({ message: 'Failed to fetch CVs', error: e.message });
  }
};
export const getCVById = async (req, res) => {
  try {
    const cv = await CV.findOne({
      where: {
        id: req.params.id,
        userId: req.userId, // важно, чтобы пользователь мог получить только своё резюме
      },
    });

    if (!cv) {
      return res.status(404).json({ message: 'CV not found' });
    }

    res.json(cv);
  } catch (e) {
    res.status(500).json({ message: 'Failed to fetch CV', error: e.message });
  }
};
export const createCV = async (req, res) => {
  try {
    const { title, content } = req.body;
    const cv = await CV.create({ userId: req.userId, title, content });
    res.status(201).json(cv);
  } catch (e) {
    res.status(500).json({ message: 'Failed to create CV', error: e.message });
  }
};

export const updateCV = async (req, res) => {
  try {
    const { id } = req.params;
    let { title, salary, post, conditions, ...otherFields } = req.body;

    // если массив — сериализуем в строку
    if (Array.isArray(conditions)) {
      conditions = JSON.stringify(conditions);
    }

    await CV.update(
      { title, salary, post, conditions,professions, hard_skill, currency, ...otherFields },
      { where: { id } }
    );

    const updatedCV = await CV.findByPk(id);

    // если нужно — парсим обратно для фронта
    if (updatedCV.conditions && typeof updatedCV.conditions === 'string') {
      try {
        updatedCV.conditions = JSON.parse(updatedCV.conditions);
      } catch {}
    }

    res.json(updatedCV);
  } catch (e) {
    res.status(500).json({ message: 'Failed to update CV', error: e.message });
  }
};



export const deleteCV = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await CV.destroy({ where: { id, userId: req.userId } });
    if (!deleted) return res.status(404).json({ message: 'CV not found' });
    res.json({ message: 'CV deleted' });
  } catch (e) {
    res.status(500).json({ message: 'Failed to delete CV', error: e.message });
  }
};
