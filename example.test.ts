import { test, describe, vi, expect, Mocked } from "vitest";
import { testFn, request } from "./utils";
import axios from "axios";
vi.mock('axios')

const mockAxios = axios as Mocked<typeof axios>;
/**
 * 1.监控一个函数是否被调用，是否被某个值调用
 * 2.监控一个对象上的方法是否被调用
 * 3.mock一个函数，让其返回自己需要的返回值
 */



describe('functions', () => {
  test("mock function", () => {
    const callback = vi.fn();
    testFn(12, callback)
    expect(callback).toHaveBeenCalled()
    expect(callback).toHaveBeenCalledWith(12)
  })
  test("spy on method", () => {
    const obj = {
      getName() {
        return 1
      }
    }
    const spy = vi.spyOn(obj, 'getName');
    obj.getName()
    expect(spy).toHaveBeenCalled()
    obj.getName()
    expect(spy).toHaveBeenCalledTimes(2)
  })
  test("mock third party module", async () => {
    // 将axios.get方法模拟为mockImplementation入参的返回值
    // mockAxios.get.mockImplementation(() => Promise.resolve({ data: 123 }))
    mockAxios.get.mockResolvedValue({ data: 123 })
    const result = await request()
    expect(result).toBe(123);
  })
})
