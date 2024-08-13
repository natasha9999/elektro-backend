import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class UsuarioController {
  
    public async create(request: Request, response: Response) {
      const {nome, cpf, telefone, email, endereco} = request.body;
  
      try {
        const newUser = await prisma.usuario.create({
          data: {
            nome,
            cpf,
            telefone,
            email,
            endereco,
          },
        }); 
        return response.status(201).json({message: "O usuário foi criado com sucesso!", usuario: newUser});
      } catch (error) {
        return response.status(500).json({messageError: "Erro interno no servidor.", error: error});
      }
    }
     
    public async readAll(request: Request, response: Response) {
      try {
        const usuarios = await prisma.usuario.findMany();
        return response.status(200).json(usuarios);
      } catch (error) {
        return response.status(500).json({messageError: "Erro interno no servidor.", error: error});
      }
    }
   
    public async readById(request: Request, response: Response) {
      const {id} = request.params;
  
      try {
        const usuario = await prisma.usuario.findUnique({
              where: {codigo: Number(id) },
        });
        if (!usuario) {
            return response.status(404).json({messageError: 'O usuário não foi encontrado.' });
          }
        return response.status(200).json(usuario);
      } catch (error) {
        return response.status(500).json({messageError: "Erro interno no servidor.", error: error});
      }
    }
  
    public async update(request: Request, response: Response) {
      const {id} = request.params;
      const {nome, cpf, telefone, email, endereco} = request.body;
  
      try {
        const updatedUsuario = await prisma.usuario.update({
          where: {codigo: Number(id)},
          data: {
            nome,
            cpf,
            telefone,
            email,
            endereco,
          },
        });
        return response.status(200).json({message: "O usuário foi atualizado com sucesso!", usuario: updatedUsuario,});
      } catch (error) {
        return response.status(500).json({messageError: "Erro interno no servidor.",error:error});
      }
    }
  
    public async delete(request: Request, response: Response) {
      const {id} = request.params;
  
      try {
        await prisma.usuario.delete({
        where: { codigo: Number(id) },
        });
        return response.status(204).end();
      } catch (error) {
        return response.status(500).json({messageError: "Erro interno no servidor.", error:error});
      }
    }
  }
  
  export const usuarioController = new UsuarioController();