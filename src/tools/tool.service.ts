import { Injectable, BadRequestException } from '@nestjs/common';
import { Tool } from './tool.entity';
import { Connection, Repository, QueryRunner } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ToolService {

  public dbConnection: QueryRunner;

  constructor(
    private readonly connection: Connection,
    @InjectRepository(Tool) private toolsRepository: Repository<Tool>
  ) {
    this.dbConnection = this.connection.createQueryRunner();
  }

  async findAll(tag?: string): Promise<Tool[]> {
    const tools: Tool[] = await this.toolsRepository.find({ where: { tag } });
    return tools;
  }

  async findOne(id: string): Promise<Tool> {
    const tool: Tool = await this.toolsRepository.findOne(id);
    return tool;
  }

  async create(tool: Tool): Promise<Tool> {
    let createTool: Tool;
    await this.dbConnection.connect();
    await this.dbConnection.startTransaction();

    try {
      createTool = await this.toolsRepository.save(tool);

      await this.dbConnection.commitTransaction();
    } catch {
      await this.dbConnection.rollbackTransaction();
      throw new BadRequestException();
    } finally {
      await this.dbConnection.release();
    }

    return createTool;
  }

  async delete(id: string): Promise<void> {
    const tool: Tool = await this.findOne(id);

    await this.dbConnection.connect();
    await this.dbConnection.startTransaction();

    try {
      await this.toolsRepository.delete(tool.id);
    } catch {
      await this.dbConnection.rollbackTransaction();
      throw new BadRequestException();
    } finally {
      await this.dbConnection.release();
    }
  }
}