import { Controller, Get, Param, ParseIntPipe, Delete, Post, Query, Body } from '@nestjs/common';
import { ToolService } from './tool.service';
import { Tool } from './tool.entity';

@Controller('tool')
export class ToolController {

  constructor(private toolService: ToolService) { }

  @Get()
  public async findAll(@Query('tag') query: string): Promise<Tool[]> {
    return await this.toolService.findAll(query);
  }

  @Get(':id')
  public async findOne(@Param('id') id: string): Promise<Tool> {
    return await this.toolService.findOne(id);
  }

  @Post()
  public async create(@Body() tool: Tool): Promise<Tool> {
    return await this.toolService.create(tool);
  }

  @Delete(':id')
  public async delete(@Param('id') id: string): Promise<void> {
    await this.toolService.delete(id);
  }
}
