import { getDirective, MapperKind, mapSchema } from '@graphql-tools/utils';
import { defaultFieldResolver, GraphQLSchema } from 'graphql';

//TODO 질문
// Q. argument는 어떻게 부여하는가?
//  => SDL에서 인자를 받을 수 있도록 정의해야함
//    directiveTransformer에서는 인자에 따른 로직을 정의해야한다. 인자의 타입을 설정하여 resolve에서 문제 없이 실행하도록 한다.
//    자세한 내용은 다음 예제 참조 https://the-guild.dev/graphql/tools/docs/schema-directives#formatting-date-strings
// Q. directive 추가시 app.module 설정은 어떻게 변경되는가?
//  => nestjs는 graphql-tools 라이브러리 구현을 적용한다.
//    directive transformer를 사용하여 SDL schema에 적용된 directive에 각각 접근하여 schema를 재구성한다.

export function upperDirectiveTransformer(
  schema: GraphQLSchema,
  directiveName: string,
) {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const upperDirective = getDirective(
        schema,
        fieldConfig,
        directiveName,
      )?.[0];

      if (upperDirective) {
        const { resolve = defaultFieldResolver } = fieldConfig;

        fieldConfig.resolve = async function (source, args, context, info) {
          const result = await resolve(source, args, context, info);
          if (typeof result === 'string') {
            return result.toUpperCase();
          }
          return result;
        };
        return fieldConfig;
      }
    },
  });
}
