import Medicine from "../models/Medicine.js";

// Create Medicine
export const addMedicine = async (req, res) => {
  try {
    const { name, description, manufacturer, mfg_date, expiry_date, stock, price, image } = req.body;

    if (!name || !price) {
      return res.status(400).json({ message: "Name and Price are required" });
    }

    const medicine = await Medicine.create({
      name,
      description,
      manufacturer,
      mfg_date,
      expiry_date,
      stock,
      price,
      image,
    });

    res.status(201).json({ message: "Medicine added", medicine });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all medicines
export const getMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.findAll();
    res.json(medicines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single medicine
export const getMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.findByPk(req.params.id);
    if (!medicine) return res.status(404).json({ message: "Medicine not found" });
    res.json(medicine);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update medicine
export const updateMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.findByPk(req.params.id);
    if (!medicine) return res.status(404).json({ message: "Medicine not found" });

    await medicine.update(req.body);
    res.json({ message: "Medicine updated", medicine });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete medicine
export const deleteMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.findByPk(req.params.id);
    if (!medicine) return res.status(404).json({ message: "Medicine not found" });

    await medicine.destroy();
    res.json({ message: "Medicine deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
