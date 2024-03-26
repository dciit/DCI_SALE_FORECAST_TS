import { MDCIPrivilege } from "./Interface";

export default function CHECK_PRIVILEGE(privilege: MDCIPrivilege[] = [], module = '', component = '', ref = '', action = '', val = '') {
    return privilege.filter(o => o.privModule == module && o.privComponent == component && o.privRef == ref && o.privAction == action && o.privVal == val);
}