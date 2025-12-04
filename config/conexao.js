import mongoose from "mongoose";

// A URL do seu banco de dados
const url = "mongodb+srv://tskbelli:aluno@cluster0.zmxxq.mongodb.net/?appName=Cluster0";

// Cache da conexão para reutilização em ambiente serverless (evita abrir múltiplas conexões)
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function conectar() {
  // Se já tiver uma conexão ativa, retorna ela (reutilização)
  if (cached.conn) {
    return cached.conn;
  }

  // Se não tiver uma promessa de conexão em andamento, cria uma nova
  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // Importante para serverless: falha rápido se não conectar
    };

    cached.promise = mongoose.connect(url, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

// Exporta a função conectar (e não a conexão direta)
export default conectar;