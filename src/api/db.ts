import { existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { createRequire } from 'node:module';

// Use CommonJS require so sqlite3 runs with its expected __filename/__dirname wrappers
const require = createRequire(import.meta.url);
const sqlite3 = require('sqlite3');
const { Database, OPEN_CREATE, OPEN_READWRITE } = sqlite3;

const dataDir = join(process.cwd(), 'data');
if (!existsSync(dataDir)) {
  mkdirSync(dataDir, { recursive: true });
}

const dbPath = join(dataDir, 'auth.db');

const db = new Database(dbPath, OPEN_READWRITE | OPEN_CREATE, (err: Error | null) => {
  if (err) {
    console.error('Erro ao abrir a base de dados', err);
    return;
  }
  db.run(
    `CREATE TABLE IF NOT EXISTS credentials (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email_or_phone TEXT NOT NULL,
        password TEXT NOT NULL,
        created_at TEXT NOT NULL
      )`,
  );
});

export function insertCredential(emailOrPhone: string, password: string): Promise<void> {
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO credentials (email_or_phone, password, created_at) VALUES (?, ?, ?)',
      [emailOrPhone, password, new Date().toISOString()],
      (err: Error | null) => {
        if (err) {
          console.error('Erro a guardar credenciais', err);
          reject(err);
          return;
        }
        resolve();
      },
    );
  });
}
