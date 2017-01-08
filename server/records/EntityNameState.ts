import { Map } from 'immutable';

type EntityNameValue = string | EntityNameState;

export interface EntityNameState extends Map<string, string | EntityNameValue> {

}
