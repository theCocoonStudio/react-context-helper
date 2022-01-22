import {useCallback as $aODKb$useCallback} from "react";
import {enableES5 as $aODKb$enableES5, useImmer as $aODKb$useImmer} from "immer";

function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
var $393673603234b845$exports = {};

$parcel$export($393673603234b845$exports, "ContextProvider", function () { return $393673603234b845$export$9f27bc3417b4524d; }, function (v) { return $393673603234b845$export$9f27bc3417b4524d = v; });
var $393673603234b845$export$9f27bc3417b4524d;
"use strict";
var $a406a6d4cebe87fe$exports = {};
"use strict";
Object.defineProperty($a406a6d4cebe87fe$exports, "__esModule", {
    value: true
});
$a406a6d4cebe87fe$exports.ContextProvider = void 0;


function $a406a6d4cebe87fe$var$ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        enumerableOnly && (symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        })), keys.push.apply(keys, symbols);
    }
    return keys;
}
function $a406a6d4cebe87fe$var$_objectSpread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = null != arguments[i] ? arguments[i] : {
        };
        i % 2 ? $a406a6d4cebe87fe$var$ownKeys(Object(source), !0).forEach(function(key) {
            $a406a6d4cebe87fe$var$_defineProperty(target, key, source[key]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : $a406a6d4cebe87fe$var$ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function $a406a6d4cebe87fe$var$_defineProperty(obj, key, value) {
    if (key in obj) Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
    });
    else obj[key] = value;
    return obj;
}
function $a406a6d4cebe87fe$var$_slicedToArray(arr, i) {
    return $a406a6d4cebe87fe$var$_arrayWithHoles(arr) || $a406a6d4cebe87fe$var$_iterableToArrayLimit(arr, i) || $a406a6d4cebe87fe$var$_unsupportedIterableToArray(arr, i) || $a406a6d4cebe87fe$var$_nonIterableRest();
}
function $a406a6d4cebe87fe$var$_nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function $a406a6d4cebe87fe$var$_unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return $a406a6d4cebe87fe$var$_arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return $a406a6d4cebe87fe$var$_arrayLikeToArray(o, minLen);
}
function $a406a6d4cebe87fe$var$_arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function $a406a6d4cebe87fe$var$_iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
        for(_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
function $a406a6d4cebe87fe$var$_arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
}
(0, $aODKb$enableES5)();
var $a406a6d4cebe87fe$var$ContextProvider = function ContextProvider(props) {
    var _useImmer = (0, $aODKb$useImmer)(props.value), _useImmer2 = $a406a6d4cebe87fe$var$_slicedToArray(_useImmer, 2), context = _useImmer2[0], setContext = _useImmer2[1];
    var updateContext = (0, $aODKb$useCallback)(function(toMerge) {
        setContext(function(draft) {
            Object.assign(draft, toMerge);
        });
    }, [
        setContext
    ]);
    var removeFromContext = (0, $aODKb$useCallback)(function(toDelete) {
        setContext(function(draft) {
            toDelete.forEach(function(key) {
                delete draft[key];
            });
        });
    }, [
        setContext
    ]);
    return(/*#__PURE__*/ React.createElement(props.context.Provider, {
        value: $a406a6d4cebe87fe$var$_objectSpread($a406a6d4cebe87fe$var$_objectSpread({
        }, context), {
        }, {
            updateContext: updateContext,
            removeFromContext: removeFromContext
        })
    }, props.children));
};
$a406a6d4cebe87fe$exports.ContextProvider = $a406a6d4cebe87fe$var$ContextProvider;


$393673603234b845$export$9f27bc3417b4524d = $a406a6d4cebe87fe$exports.ContextProvider;


export {$393673603234b845$export$9f27bc3417b4524d as ContextProvider, $393673603234b845$exports as default};
//# sourceMappingURL=module.js.map
