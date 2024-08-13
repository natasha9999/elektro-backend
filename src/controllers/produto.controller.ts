import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class ProdutoController {
  
    public async create(request: Request, response: Response) {
      const {nome, cor, marca, descricao, preco, fk_Usuario_codigo} = request.body;
  
      try {
        const newProduct = await prisma.produto.create({
          data: {
            nome,
            cor,
            marca,
            descricao,
            preco,
            fk_Usuario_codigo,
          },
        }); 
        return response.status(201).json({message: "O produto foi criado com sucesso!", produto: newProduct});
      } catch (error) {
        return response.status(500).json({messageError: "Erro interno no servidor.", error: error});
      }
    }
     
    public async readAll(request: Request, response: Response) {
      try {
        const produtos = await prisma.produto.findMany();
        return response.status(200).json(produtos);
      } catch (error) {
        return response.status(500).json({messageError: "Erro interno no servidor.", error: error});
      }
    }
   
    public async readById(request: Request, response: Response) {
      const {id} = request.params;
  
      try {
        const produto = await prisma.produto.findUnique({
              where: {codigo: Number(id) },
        });
        if (!produto) {
            return response.status(404).json({messageError: 'O produto não foi encontrado.' });
          }
        return response.status(200).json(produto);
      } catch (error) {
        return response.status(500).json({messageError: "Erro interno no servidor.", error: error});
      }
    }
  
    public async update(request: Request, response: Response) {
      const {id} = request.params;
      const {nome, cor, marca, descricao, preco, fk_Usuario_codigo} = request.body;
  
      try {
        const updatedProduto = await prisma.produto.update({
          where: {codigo: Number(id)},
          data: {
            nome,
            cor,
            marca,
            descricao,
            preco,
            fk_Usuario_codigo,
          },
        });
        return response.status(200).json({message: "O produto foi atualizado com sucesso!", produto: updatedProduto,});
      } catch (error) {
        return response.status(500).json({messageError: "Erro interno no servidor.",error:error});
      }
    }
  
    public async delete(request: Request, response: Response) {
      const {id} = request.params;
  
      try {
        await prisma.produto.delete({
        where: { codigo: Number(id) },
        });
        return response.status(204).end();
      } catch (error) {
        return response.status(500).json({messageError: "Erro interno no servidor.", error:error});
      }
    }
  }
  
  export const produtoController = new ProdutoController();