import axios from 'axios'
import humps from 'humps'

import { parseURL, parseConfig } from '_utils/request'
import { API_URL } from '_config/environment'
import { createFormData } from '_utils/helpers'

const GET = 'get'
const PUT = 'put'
const POST = 'post'
const PATCH = 'patch'
const DELETE = 'delete'

const instance = axios.create({
  baseURL: API_URL,
  headers: { 'Content-type': 'application/json; charset=UTF-8' },
})

const returnData = ({
  transformPayload,
  transformOnlyResponse,
  transformOnlyRequest,
}) => response => {
  const shouldTransform = (transformPayload || transformOnlyResponse) && !transformOnlyRequest
  return shouldTransform ? humps.camelizeKeys(response.data) : response.data
}

const handleResponseError = error =>
  new Promise((resolve, reject) =>
    error && error.response ? reject(error.response.data) : reject()
  )

// decamelize keys for the API
const decamelizePayload = data => humps.decamelizeKeys(data)

// Check if should be decamelized or not
const parsePayload = ({
  data,
  transformPayload,
  transformOnlyResponse,
  transformOnlyRequest,
  transformFormData,
}) => {
  const shouldTransform = (transformPayload || transformOnlyRequest) && !transformOnlyResponse
  if (transformFormData) {
    return createFormData(data, shouldTransform)
  }
  return shouldTransform ? decamelizePayload(data) : data
}

const parseParams = (url, config, data, baseURL = null) => method => {
  const {
    removeTrailingSlash,
    transformPayload = true,
    transformOnlyRequest,
    transformOnlyResponse,
    transformFormData = false,
    ...configParams
  } = config

  // Methods that require payload
  const payloadMethods = [PUT, POST, PATCH]

  const axiosConfigs = {
    ...(baseURL && { baseURL }), // Dynamically update the base url if needed
    method,
    url: parseURL(url, removeTrailingSlash), // Endpoint's URL
    ...parseConfig(configParams), // Update config params like headers and authorization
    ...(payloadMethods.includes(method) && {
      data: parsePayload({
        data,
        transformPayload,
        transformOnlyResponse,
        transformOnlyRequest,
        transformFormData,
      }),
    }), // Format and add payload if method requires it
  }

  return instance(axiosConfigs)
    .then(returnData({ transformPayload, transformOnlyResponse, transformOnlyRequest }))
    .catch(handleResponseError)
}

export const post = (...params) => parseParams(...params)(POST)
export const patch = (...params) => parseParams(...params)(PATCH)
export const put = (...params) => parseParams(...params)(PUT)
export const upload = (...params) => parseParams(...params)(POST)
export const del = (...params) => parseParams(...params)(DELETE)
export const get = (...params) => parseParams(...params)(GET)

instance.getURL = url => API_URL + parseURL(url)

export default instance
