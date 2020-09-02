import * as bt from '@babel/types';
import { ParamType } from '../Documentation';
export default function getTypeFromAnnotation(typeNode: bt.TypeAnnotation | bt.TSTypeAnnotation | bt.Noop | null): ParamType | undefined;
