import { GraphQLSchema } from 'graphql';
import { daysTransformer } from './days';
import { upperDirectiveTransformer } from './upper';

type DirectiveTransformer = (schema: GraphQLSchema) => GraphQLSchema;
const directiveTransformers: DirectiveTransformer[] = [
  (schema) => upperDirectiveTransformer(schema, 'upper'),
  (schema) => daysTransformer(schema, 'days'),
];

export const directiveTransformerReducer: DirectiveTransformer = (
  originSchema,
) =>
  directiveTransformers.reduce(
    (curSchema, transformer) => transformer(curSchema),
    originSchema,
  );
