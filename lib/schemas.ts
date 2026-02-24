import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Email inválido.'),
  password: z.string().min(1, 'Password obrigatória.')
});

export const nifSchema = z
  .string()
  .regex(/^\d{9}$/, 'O NIF deve conter exatamente 9 dígitos.');

export const clientSchema = z.object({
  nome: z.string().min(2, 'Nome é obrigatório.'),
  nif: nifSchema,
  morada: z.string().min(3, 'Morada é obrigatória.'),
  email: z.string().email('Email inválido.')
});

export const serviceSchema = z.object({
  titulo: z.string().min(2, 'Título é obrigatório.'),
  descricao: z.string().min(5, 'Descrição é obrigatória.'),
  preco: z.coerce.number().min(0, 'Preço não pode ser negativo.').nullable().optional(),
  data: z.string().min(1, 'Data obrigatória.'),
  clientId: z.string().min(1, 'Cliente obrigatório.')
});

export const contactSchema = z.object({
  nome: z.string().min(2, 'Nome obrigatório.'),
  telefone: z.string().min(9, 'Telefone obrigatório.'),
  email: z.string().email('Email inválido.'),
  conteudo: z.string().min(10, 'Mensagem demasiado curta.')
});

export const passwordChangeSchema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(8, 'A nova password deve ter pelo menos 8 caracteres.')
});
