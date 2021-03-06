/* global mocha */
'use strict';

mocha.setup({
  globals: [
    'PerformanceTestingHelper',
    'asyncStorage',
    'LazyL10n',
    'BlobView',
    'parseJPEGMetadata',
    'getVideoRotation',
    'Format',
    'VideoPlayer',
    'GestureDetector',
    'debug',
    'CONFIG_AVG_JPEG_COMPRESSION_RATIO',
    'MediaFrame',
    'confirm',
    'MozActivity',
    'CustomDialog'
  ]
});

// Shim for non FXOS environments
if (!navigator.getDeviceStorage) {
  navigator.getDeviceStorage = function() {};
}

// Once we have alemeda (requirejs) we can
// begin loading in our modules to test.
requireApp('camera/js/vendor/alameda.js', function() {
  window.req = window.requirejs.config({
    baseUrl: '/js',
    paths: {
      'asyncStorage': '../shared/js/async_storage',
      'getVideoRotation': '../shared/js/media/get_video_rotation',
      'performance-testing-helper': '../shared/js/performance_testing_helper',
      'jpegMetaDataParser': '../shared/js/media/jpeg_metadata_parser',
      'format': '../shared/js/format',
      'GestureDetector': '../shared/js/gesture_detector',
      'VideoPlayer': '../shared/js/media/video_player',
      'MediaFrame': '../shared/js/media/media_frame',
      'BlobView': '../shared/js/blobview',
      'CustomDialog': '../shared/js/custom_dialog',
      'debug': 'vendor/debug'
    },
    shim: {
      'format': {
        exports: 'Format'
      },
      'getVideoRotation': {
        deps: ['BlobView'],
        exports: 'getVideoRotation'
      },
      'MediaFrame': {
        deps: ['format', 'VideoPlayer'],
        exports: 'MediaFrame'
      },
      'BlobView': {
        exports: 'BlobView'
      },
      'asyncStorage': {
        exports: 'asyncStorage'
      },
      'performance-testing-helper': {
        exports: 'PerformanceTestingHelper'
      },
      'jpegMetaDataParser': {
        exports: 'parseJPEGMetadata'
      },
      'GestureDetector': {
        exports: 'GestureDetector'
      },
      'CustomDialog': {
        exports: 'CustomDialog'
      }
    }
  });
});

require('/shared/test/unit/mocks/mocks_helper.js');
