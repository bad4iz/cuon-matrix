import {test, expect} from "vitest";
import {Matrix4} from "./index";

test('Matrix4 constructor default', ()=>{
    expect(new Matrix4()).toEqual({
        "elements":new Float32Array([1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1])
    });
})

test('Matrix4 constructor default', ()=>{
    expect(new Matrix4()).toEqual({
        "elements":new Float32Array([1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1])
    });
})

test('setIdentity', ()=>{
    const matrix4 =  new Matrix4();
    expect(matrix4.setIdentity()).toEqual({
        "elements":new Float32Array([1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1])
    });
})
