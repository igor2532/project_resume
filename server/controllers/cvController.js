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
    // Возможно вот тут! 👇
    let { title, salary, post, conditions, professions, hard_skill, ...otherFields } = req.body;

    // Тебе нужно обязательно получить professions и hard_skill из тела запроса, иначе дальше в коде они будут undefined

    // Тут сериализация, если надо
    if (Array.isArray(conditions)) conditions = JSON.stringify(conditions);
    if (Array.isArray(professions)) professions = JSON.stringify(professions);
    if (Array.isArray(hard_skill)) hard_skill = JSON.stringify(hard_skill);

    await CV.update(
      { title, salary, post, conditions, professions, hard_skill, ...otherFields },
      { where: { id } }
    );

    const updatedCV = await CV.findByPk(id);

    // Для фронта можно десериализовать обратно (если надо)
    if (updatedCV.conditions && typeof updatedCV.conditions === 'string') {
      try { updatedCV.conditions = JSON.parse(updatedCV.conditions); } catch {}
    }
    if (updatedCV.professions && typeof updatedCV.professions === 'string') {
      try { updatedCV.professions = JSON.parse(updatedCV.professions); } catch {}
    }
    if (updatedCV.hard_skill && typeof updatedCV.hard_skill === 'string') {
      try { updatedCV.hard_skill = JSON.parse(updatedCV.hard_skill); } catch {}
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
