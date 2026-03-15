import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Mock Data Paths
  const DATA_DIR = path.join(process.cwd(), "data");
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR);
  }

  const getFilePath = (filename: string) => path.join(DATA_DIR, filename);

  const initializeData = (filename: string, initialData: any) => {
    const filePath = getFilePath(filename);
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify(initialData, null, 2));
    }
  };

  // Initial Mock Data
  const initialPlaces = [
    {
      id: "1",
      type: "hotel",
      name: "Grand Palace Hotel",
      location: "Paris, France",
      rating: 4.8,
      reviewsCount: 1240,
      price: "$250",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
      description: "A luxury stay in the heart of Paris with stunning Eiffel Tower views.",
      category: "Luxury"
    },
    {
      id: "2",
      type: "restaurant",
      name: "Le Petit Bistro",
      location: "Lyon, France",
      rating: 4.5,
      reviewsCount: 850,
      price: "$$",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
      description: "Authentic French cuisine in a cozy, traditional setting.",
      category: "French"
    },
    {
      id: "3",
      type: "attraction",
      name: "Eiffel Tower",
      location: "Paris, France",
      rating: 4.9,
      reviewsCount: 50000,
      price: "$30",
      image: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=800&q=80",
      description: "The iconic symbol of France and a must-visit landmark.",
      category: "Landmark"
    },
    {
      id: "4",
      type: "hotel",
      name: "Ocean View Resort",
      location: "Bali, Indonesia",
      rating: 4.7,
      reviewsCount: 2100,
      price: "$180",
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
      description: "Relaxing beachfront resort with infinity pools and spa.",
      category: "Resort"
    }
  ];

  initializeData("places.json", initialPlaces);
  initializeData("reviews.json", []);

  // API Routes
  app.get("/api/places", (req, res) => {
    const data = JSON.parse(fs.readFileSync(getFilePath("places.json"), "utf-8"));
    const { type, search } = req.query;
    let filtered = data;
    if (type) filtered = filtered.filter((p: any) => p.type === type);
    if (search) {
      const s = (search as string).toLowerCase();
      filtered = filtered.filter((p: any) => 
        p.name.toLowerCase().includes(s) || p.location.toLowerCase().includes(s)
      );
    }
    res.json(filtered);
  });

  app.get("/api/places/:id", (req, res) => {
    const data = JSON.parse(fs.readFileSync(getFilePath("places.json"), "utf-8"));
    const place = data.find((p: any) => p.id === req.params.id);
    if (place) res.json(place);
    else res.status(404).json({ message: "Place not found" });
  });

  app.post("/api/places", (req, res) => {
    const data = JSON.parse(fs.readFileSync(getFilePath("places.json"), "utf-8"));
    const newPlace = { ...req.body, id: Date.now().toString() };
    data.push(newPlace);
    fs.writeFileSync(getFilePath("places.json"), JSON.stringify(data, null, 2));
    res.status(201).json(newPlace);
  });

  app.delete("/api/places/:id", (req, res) => {
    let data = JSON.parse(fs.readFileSync(getFilePath("places.json"), "utf-8"));
    data = data.filter((p: any) => p.id !== req.params.id);
    fs.writeFileSync(getFilePath("places.json"), JSON.stringify(data, null, 2));
    res.status(204).send();
  });

  app.get("/api/reviews/:placeId", (req, res) => {
    const data = JSON.parse(fs.readFileSync(getFilePath("reviews.json"), "utf-8"));
    const reviews = data.filter((r: any) => r.placeId === req.params.placeId);
    res.json(reviews);
  });

  app.post("/api/reviews", (req, res) => {
    const data = JSON.parse(fs.readFileSync(getFilePath("reviews.json"), "utf-8"));
    const newReview = { ...req.body, id: Date.now().toString(), date: new Date().toISOString() };
    data.push(newReview);
    fs.writeFileSync(getFilePath("reviews.json"), JSON.stringify(data, null, 2));
    res.status(201).json(newReview);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
