const { PrismaClient } = require('@prisma/client');

class PrismaModule {
  constructor() {
    if (!PrismaModule.prismaInstance) {
      this.prismaInstance = new PrismaClient();
    }
  }

  async connect() {
    try {
      if (!this.prismaInstance) {
        this.prismaInstance = new PrismaClient();
      }
      await this.prismaInstance.$connect();
    } catch (err) {
      throw err;
    }
  }

  async disconnect() {
    try {
      await this.prismaInstance?.$disconnect();
    } catch (err) {
      throw err;
    }
  }
}

module.exports = new PrismaModule();
