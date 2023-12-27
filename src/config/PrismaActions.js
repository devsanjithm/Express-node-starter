const PrismaActionTypes = [
  'findUnique',
  'findUniqueOrThrow',
  'findMany',
  'findFirst',
  'findFirstOrThrow',
  'create',
  'createMany',
  'update',
  'updateMany',
  'upsert',
  'delete',
  'deleteMany',
  'executeRaw',
  'queryRaw',
  'aggregate',
  'count',
  'runCommandRaw',
  'findRaw',
  'groupBy',
];

const PrismaFindAction = ['findUnique', 'findUniqueOrThrow', 'findMany', 'findFirst', 'findFirstOrThrow'];

const PrismaCreateAction = ['create', 'createMany'];

const PrismaUpdateAction = ['update', 'updateMany', 'upsert'];

const PrismaDeleteAction = ['delete', 'deleteMany'];

module.exports = {
  PrismaActionTypes,
  PrismaFindAction,
  PrismaCreateAction,
  PrismaUpdateAction,
  PrismaDeleteAction,
};
