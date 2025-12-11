import { getDirective, MapperKind, mapSchema } from '@graphql-tools/utils';
import {
  defaultFieldResolver,
  GraphQLBoolean,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

// operation Exam
// query getPostCreatedDays{
//   post(id :1){
//     createdAt(isDays : true)
//   }
// }

export function daysTransformer(schema: GraphQLSchema, directiveName: string) {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const dateDirective = getDirective(
        schema,
        fieldConfig,
        directiveName,
      )?.[0];

      if (dateDirective) {
        const { resolve = defaultFieldResolver } = fieldConfig;
        const defaultIsDays = false;

        if (!fieldConfig.args) {
          throw new Error('Unexpected Error. args should be defined');
        }

        fieldConfig.args['isDays'] = {
          type: GraphQLBoolean,
        };

        //update field output type as String, so value would be transformed string if value is not string
        fieldConfig.type = GraphQLString;
        fieldConfig.resolve = async (
          source,
          { isDays, ...args },
          context,
          info,
        ) => {
          const isDaysArgs = (isDays as undefined | boolean) ?? defaultIsDays;
          const date = await resolve(source, args, context, info);
          if (date instanceof Date && isDaysArgs) {
            return date.getDay();
          } else if (date instanceof Date) {
            return date.toISOString();
          }
          return date;
        };
        return fieldConfig;
      }
    },
  });
}
