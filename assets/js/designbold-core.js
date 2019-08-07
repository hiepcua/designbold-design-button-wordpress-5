"use strict";
/*
 * DesignBold JS SDK v1.0
 *
 * Using in Design IT Button
 *
 * Copyright (c) DesignBold
 */

window.DBSDK_Cfg = {
    export_mode : ['publish', 'download'],
    export_callback: function (resultUrl, document_id, options) {
        // do something with design image URL, which is only accessible for 24 hours
        resultUrl = encodeURIComponent(resultUrl);
        var url  = WPURLS.siteurl + "/wp-admin/admin-ajax.php?action=dbdb_download_image";
        var params = "post_id=" + WPURLS.post_id + "&image_url=" + resultUrl + "&image_name=" + document_id;
        DBSDK.uploadImage(url, params, "POST");
    },
};

window.DBSDK = {
    app_id : "08b68956d3",
    API: {
        host: 'www.designbold.com'
    }
};

// Add style css
(function (doc) {
    var style = doc.createElement('style');
    style.type = 'text/css';
    style.innerHTML = ".db-btn-designit,.db-btn-redesign{-moz-box-shadow:0 10px 14px -7px #000;-webkit-box-shadow:0 10px 14px -7px #000;background-color:#0098fe}@-webkit-keyframes fadeIn{from{opacity:0}to{opacity:1}}@keyframes fadeIn{from{opacity:0}to{opacity:1}}.fadeIn{-webkit-animation-name:fadeIn;animation-name:fadeIn}.animated{-webkit-animation-duration:1s;animation-duration:1s;-webkit-animation-fill-mode:both;animation-fill-mode:both}.db-btn-designit{box-shadow:0 10px 14px -7px #000;font-family:Arial;-moz-border-radius:3px;border-radius:3px;display:inline-block;cursor:pointer;color:#fff;font-size:13px;font-weight:700;padding:0 10px 0 30px;height:30px;line-height:32px;z-index:99999;text-decoration:none;-moz-transition:all ease .3s;-o-transition:all ease .3s;-webkit-transition:all ease .3s;transition:all ease .3s;background-image:url(data:image/png;base64,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/GMzLdsAADvqaVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/Pgo8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzExMSA3OS4xNTgzMjUsIDIwMTUvMDkvMTAtMDE6MTA6MjAgICAgICAgICI+CiAgIDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgICAgICAgICAgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iCiAgICAgICAgICAgIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgICAgICAgICAgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgICAgICAgICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iPgogICAgICAgICA8eG1wOkNyZWF0b3JUb29sPkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE1IChXaW5kb3dzKTwveG1wOkNyZWF0b3JUb29sPgogICAgICAgICA8eG1wOkNyZWF0ZURhdGU+MjAxNi0wNC0xNVQxMzozNjo1MyswNzowMDwveG1wOkNyZWF0ZURhdGU+CiAgICAgICAgIDx4bXA6TWV0YWRhdGFEYXRlPjIwMTYtMDQtMTVUMTQ6MzE6MDUrMDc6MDA8L3htcDpNZXRhZGF0YURhdGU+CiAgICAgICAgIDx4bXA6TW9kaWZ5RGF0ZT4yMDE2LTA0LTE1VDE0OjMxOjA1KzA3OjAwPC94bXA6TW9kaWZ5RGF0ZT4KICAgICAgICAgPHhtcE1NOkluc3RhbmNlSUQ+eG1wLmlpZDo5MjU4YjVmNi03ZjI3LWQyNGMtYmYyNi02N2FlZDY3ZTc2Nzc8L3htcE1NOkluc3RhbmNlSUQ+CiAgICAgICAgIDx4bXBNTTpEb2N1bWVudElEPmFkb2JlOmRvY2lkOnBob3Rvc2hvcDo2ZGIzZmY3ZC0wMmQ0LTExZTYtOTg0ZC1mMzU1ZWE5OGUxNGU8L3htcE1NOkRvY3VtZW50SUQ+CiAgICAgICAgIDx4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ+eG1wLmRpZDpjM2QwMjFlNC02NTNhLWU5NDQtODFjMS01Njg0OGE2ZTE4N2U8L3htcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD4KICAgICAgICAgPHhtcE1NOkhpc3Rvcnk+CiAgICAgICAgICAgIDxyZGY6U2VxPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5jcmVhdGVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDppbnN0YW5jZUlEPnhtcC5paWQ6YzNkMDIxZTQtNjUzYS1lOTQ0LTgxYzEtNTY4NDhhNmUxODdlPC9zdEV2dDppbnN0YW5jZUlEPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6d2hlbj4yMDE2LTA0LTE1VDEzOjM2OjUzKzA3OjAwPC9zdEV2dDp3aGVuPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6c29mdHdhcmVBZ2VudD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNSAoV2luZG93cyk8L3N0RXZ0OnNvZnR3YXJlQWdlbnQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5zYXZlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6aW5zdGFuY2VJRD54bXAuaWlkOmJjN2I1NTg2LTExNDQtMzM0Ni04ZWFkLTIyOWFhZDQxZmZiOTwvc3RFdnQ6aW5zdGFuY2VJRD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OndoZW4+MjAxNi0wNC0xNVQxMzozNjo1MyswNzowMDwvc3RFdnQ6d2hlbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpPC9zdEV2dDpzb2Z0d2FyZUFnZW50PgogICAgICAgICAgICAgICAgICA8c3RFdnQ6Y2hhbmdlZD4vPC9zdEV2dDpjaGFuZ2VkPgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+c2F2ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDo5MjU4YjVmNi03ZjI3LWQyNGMtYmYyNi02N2FlZDY3ZTc2Nzc8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMTYtMDQtMTVUMTQ6MzE6MDUrMDc6MDA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpzb2Z0d2FyZUFnZW50PkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE1IChXaW5kb3dzKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmNoYW5nZWQ+Lzwvc3RFdnQ6Y2hhbmdlZD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgIDwvcmRmOlNlcT4KICAgICAgICAgPC94bXBNTTpIaXN0b3J5PgogICAgICAgICA8ZGM6Zm9ybWF0PmltYWdlL3BuZzwvZGM6Zm9ybWF0PgogICAgICAgICA8cGhvdG9zaG9wOkNvbG9yTW9kZT4zPC9waG90b3Nob3A6Q29sb3JNb2RlPgogICAgICAgICA8cGhvdG9zaG9wOklDQ1Byb2ZpbGU+c1JHQiBJRUM2MTk2Ni0yLjE8L3Bob3Rvc2hvcDpJQ0NQcm9maWxlPgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICAgICA8dGlmZjpYUmVzb2x1dGlvbj43MjAwMDAvMTAwMDA8L3RpZmY6WFJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOllSZXNvbHV0aW9uPjcyMDAwMC8xMDAwMDwvdGlmZjpZUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6UmVzb2x1dGlvblVuaXQ+MjwvdGlmZjpSZXNvbHV0aW9uVW5pdD4KICAgICAgICAgPGV4aWY6Q29sb3JTcGFjZT4xPC9leGlmOkNvbG9yU3BhY2U+CiAgICAgICAgIDxleGlmOlBpeGVsWERpbWVuc2lvbj4yMDwvZXhpZjpQaXhlbFhEaW1lbnNpb24+CiAgICAgICAgIDxleGlmOlBpeGVsWURpbWVuc2lvbj4yMDwvZXhpZjpQaXhlbFlEaW1lbnNpb24+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgIAo8P3hwYWNrZXQgZW5kPSJ3Ij8+1i5r2gAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAACoUlEQVR42pSVy0tUYRjGf3NmvF8iL6ndoBKisMuiFkE3Kiq6aWXRokWbaNtfUNCiC5VKBEEuWnWBMLNcFEFQSheMUYlEY8qcxPHajDnN7eg8LRrldEYtH/g273Pe3wff973PcUhiGuUB24BDwEZgYaLeB7QAT4BmYCipU5J9HZHUqn/rk6Rj9n47rEpmTHEzqjmoeiZgjSSZnS0K37usOarGDqycdMyuDwocXSjT/XKu0GOSMIAc4NLkmRrZ81AkSKyuBiIh5qCLQI4BHARKp4DOFFJy5sOQF2JjAAwGTbyjUUJmfDZgKXDIlQBOKb5gKel7T2G8eURLb4javh94un1EJkRhVgrlq/M4ub6AVKdjOugBF7DWWumKm3RureBwRjr1777yMLCUVZki3WXwaTBM07ceegJRzu1YhNORBF3rAkqsFf/oCGe9H9mw/Tg7e9JYZmSwe0UW2alO3H0hqpr7uPm2nzVFmVSW5dmBJUjyW6+qO+iXs+G6Kt3Ppn/NA2GtvN6myrufFYxO2G2/AfisW4wD+a40vowOMTweTjqk1QvSWb9kMa++pzIQnLDbPgNot1YcgP7MJPGJ5FuNC7YUutlT8JgMY8xutxtAo7VSlJZJWW4BHYEBvKGkBhzxMU4XnuHOxvOUZEXsdqORSA7PZCXblcr+4uVEzQhXPR8YiYUtQQKR/mqC/m7M3BOQUmyFeYCnSaMnSSOxsDa/vi8eXNCm13W64WnVsK9W8c/7NNyM/O5lGg93TDt61nCotrodP0e0s+mBqLslV/1VtTTlSu+Rv7VUscDzf4bD5PorZn6ZUd3v/aYrXW/V670mDd/WePS7HXZ5tjxEUoWktv9Il9bEt3/1O2b4BeQDu4ByYJ1lmnyJZ9YAvAB+2Bt/DwBjORDN8Mr1IAAAAABJRU5ErkJggg==);background-repeat:no-repeat;background-position:5px 5px}.db-btn-designit:hover{background-color:#37acfb;color:#fff;text-decoration:none}.db-btn-designit:active{margin-top:1px}.db-overlay{padding:0;margin:0;background-color:rgba(0,0,0,.5);position:fixed;top:0;left:0;bottom:0;right:0;z-index:999999;-moz-transition:all ease .3s;-o-transition:all ease .3s;-webkit-transition:all ease .3s;transition:all ease .3s;display:none}.db-lightbox{position:fixed;top:30px;left:20px;right:20px;background-color:#fff;z-index:99999;bottom:20px;-moz-border-radius:3px;-webkit-border-radius:3px;border-radius:3px;overflow:auto !important}.db-close-lightbox{width:30px;height:30px;display:block;line-height:30px;font-size:26px;color:#eee;-moz-transition:all ease .2s;-o-transition:all ease .2s;-webkit-transition:all ease .2s;transition:all ease .2s;position:absolute;top:3px;text-align:center;font-family:Arial;right:10px;z-index:9999}.db-load,.db-loading{top:0;left:0;bottom:0;z-index:999;position:absolute}.db-close-lightbox:hover{cursor:pointer;color:#fff;-moz-transform:rotate(180deg);-webkit-transform:rotate(180deg);-o-transform:rotate(180deg);-ms-transform:rotate(180deg);transform:rotate(180deg)}.db-lightbox iframe{border:none;width:100%;height:100%}.db-loading{right:0;background-color:#f5f5f5}.db-load{right:0;background-color:rgba(0,0,0,.6);-moz-transition:all ease .3s;-o-transition:all ease .3s;-webkit-transition:all ease .3s;transition:all ease .3s}.inner-circles-loader:not(:required),.large.inner-circles-loader:not(:required){background:rgba(2,188,155,.7);overflow:hidden;text-indent:-9999px;-webkit-mask-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAA5JREFUeNpiYGBgAAgwAAAEAAGbA+oJAAAAAElFTkSuQmCC);border-radius:50%}.db-load .db-load-img{position:absolute;top:50%;left:50%;margin:-25px 0 0 -25px;display:block}.inner-circles-loader:not(:required){-moz-transform:translate3d(0,0,0);-ms-transform:translate3d(0,0,0);-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0);position:relative;display:inline-block;width:50px;height:50px}.inner-circles-loader:not(:required):after,.inner-circles-loader:not(:required):before{content:\'\';position:absolute;top:0;display:inline-block;width:50px;height:50px;border-radius:50%}.large.inner-circles-loader:not(:required){-moz-transform:translate3d(0,0,0);-ms-transform:translate3d(0,0,0);-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0);position:relative;display:inline-block;width:90px;height:90px}.large.inner-circles-loader:not(:required):after,.large.inner-circles-loader:not(:required):before{content:\'\';position:absolute;top:0;display:inline-block;width:90px;height:90px;border-radius:50%}.inner-circles-loader:not(:required):before{-moz-animation:inner-circles-loader 3s infinite;-webkit-animation:inner-circles-loader 3s infinite;animation:inner-circles-loader 3s infinite;-moz-transform-origin:0 50%;-ms-transform-origin:0 50%;-webkit-transform-origin:0 50%;transform-origin:0 50%;left:0;background:#c7efcf}.inner-circles-loader:not(:required):after{-moz-animation:inner-circles-loader 3s .2s reverse infinite;-webkit-animation:inner-circles-loader 3s .2s reverse infinite;animation:inner-circles-loader 3s .2s reverse infinite;-moz-transform-origin:100% 50%;-ms-transform-origin:100% 50%;-webkit-transform-origin:100% 50%;transform-origin:100% 50%;right:0;background:#eef5db;background-color:rgba(44,151,221,.7)}@-moz-keyframes inner-circles-loader{0%,100%{-moz-transform:rotate(0);transform:rotate(0)}50%{-moz-transform:rotate(360deg);transform:rotate(360deg)}}@-webkit-keyframes inner-circles-loader{0%,100%{-webkit-transform:rotate(0);transform:rotate(0)}50%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes inner-circles-loader{0%,100%{-moz-transform:rotate(0);-ms-transform:rotate(0);-webkit-transform:rotate(0);transform:rotate(0)}50%{-moz-transform:rotate(360deg);-ms-transform:rotate(360deg);-webkit-transform:rotate(360deg);transform:rotate(360deg)}}.inner-circles-loader.large{position:absolute!important;top:50%;left:50%;margin:-50px 0 0 -50px}";
    doc.getElementsByTagName('head')[0].appendChild(style);
})(document);

(function (self) {
    'use strict';

    if (self.fetch) {
        return
    }

    var support = {
        searchParams: 'URLSearchParams' in self,
        iterable: 'Symbol' in self && 'iterator' in Symbol,
        blob: 'FileReader' in self && 'Blob' in self && (function () {
            try {
                new Blob();
                return true
            } catch (e) {
                return false
            }
        })(),
        formData: 'FormData' in self,
        arrayBuffer: 'ArrayBuffer' in self
    };

    if (support.arrayBuffer) {
        var viewClasses = [
        '[object Int8Array]',
        '[object Uint8Array]',
        '[object Uint8ClampedArray]',
        '[object Int16Array]',
        '[object Uint16Array]',
        '[object Int32Array]',
        '[object Uint32Array]',
        '[object Float32Array]',
        '[object Float64Array]'
        ];

        var isDataView = function (obj) {
            return obj && DataView.prototype.isPrototypeOf(obj)
        };

        var isArrayBufferView = ArrayBuffer.isView || function (obj) {
            return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
        }
    }

    function normalizeName(name) {
        if (typeof name !== 'string') {
            name = String(name)
        }
        if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
            throw new TypeError('Invalid character in header field name')
        }
        return name.toLowerCase()
    }

    function normalizeValue(value) {
        if (typeof value !== 'string') {
            value = String(value)
        }
        return value
    }

    // Build a destructive iterator for the value list
    function iteratorFor(items) {
        var iterator = {
            next: function () {
                var value = items.shift();
                return {done: value === undefined, value: value}
            }
        };

        if (support.iterable) {
            iterator[Symbol.iterator] = function () {
                return iterator
            }
        }

        return iterator
    }

    function Headers(headers) {
        this.map = {};

        if (headers instanceof Headers) {
            headers.forEach(function (value, name) {
                this.append(name, value)
            }, this)

        } else if (headers) {
            Object.getOwnPropertyNames(headers).forEach(function (name) {
                this.append(name, headers[name])
            }, this)
        }
    }

    Headers.prototype.append = function (name, value) {
        name = normalizeName(name);
        value = normalizeValue(value);
        var oldValue = this.map[name];
        this.map[name] = oldValue ? oldValue + ',' + value : value
    };

    Headers.prototype['delete'] = function (name) {
        delete this.map[normalizeName(name)]
    };

    Headers.prototype.get = function (name) {
        name = normalizeName(name);
        return this.has(name) ? this.map[name] : null
    };

    Headers.prototype.has = function (name) {
        return this.map.hasOwnProperty(normalizeName(name))
    };

    Headers.prototype.set = function (name, value) {
        this.map[normalizeName(name)] = normalizeValue(value)
    };

    Headers.prototype.forEach = function (callback, thisArg) {
        for (var name in this.map) {
            if (this.map.hasOwnProperty(name)) {
                callback.call(thisArg, this.map[name], name, this)
            }
        }
    };

    Headers.prototype.keys = function () {
        var items = [];
        this.forEach(function (value, name) {
            items.push(name)
        });
        return iteratorFor(items)
    };

    Headers.prototype.values = function () {
        var items = [];
        this.forEach(function (value) {
            items.push(value)
        });
        return iteratorFor(items)
    };

    Headers.prototype.entries = function () {
        var items = [];
        this.forEach(function (value, name) {
            items.push([name, value])
        });
        return iteratorFor(items)
    };

    if (support.iterable) {
        Headers.prototype[Symbol.iterator] = Headers.prototype.entries
    }

    function consumed(body) {
        if (body.bodyUsed) {
            return Promise.reject(new TypeError('Already read'))
        }
        body.bodyUsed = true
    }

    function fileReaderReady(reader) {
        return new Promise(function (resolve, reject) {
            reader.onload = function () {
                resolve(reader.result)
            };
            reader.onerror = function () {
                reject(reader.error)
            }
        })
    }

    function readBlobAsArrayBuffer(blob) {
        var reader = new FileReader();
        var promise = fileReaderReady(reader);
        reader.readAsArrayBuffer(blob);
        return promise
    }

    function readBlobAsText(blob) {
        var reader = new FileReader();
        var promise = fileReaderReady(reader);
        reader.readAsText(blob);
        return promise
    }

    function readArrayBufferAsText(buf) {
        var view = new Uint8Array(buf);
        var chars = new Array(view.length);

        for (var i = 0; i < view.length; i++) {
            chars[i] = String.fromCharCode(view[i])
        }
        return chars.join('')
    }

    function bufferClone(buf) {
        if (buf.slice) {
            return buf.slice(0)
        } else {
            var view = new Uint8Array(buf.byteLength);
            view.set(new Uint8Array(buf));
            return view.buffer
        }
    }

    function Body() {
        this.bodyUsed = false;

        this._initBody = function (body) {
            this._bodyInit = body;
            if (!body) {
                this._bodyText = ''
            } else if (typeof body === 'string') {
                this._bodyText = body
            } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
                this._bodyBlob = body
            } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
                this._bodyFormData = body
            } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
                this._bodyText = body.toString()
            } else if (support.arrayBuffer && support.blob && isDataView(body)) {
                this._bodyArrayBuffer = bufferClone(body.buffer);
                // IE 10-11 can't handle a DataView body.
                this._bodyInit = new Blob([this._bodyArrayBuffer])
            } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
                this._bodyArrayBuffer = bufferClone(body)
            } else {
                throw new Error('unsupported BodyInit type')
            }

            if (!this.headers.get('content-type')) {
                if (typeof body === 'string') {
                    this.headers.set('content-type', 'text/plain;charset=UTF-8')
                } else if (this._bodyBlob && this._bodyBlob.type) {
                    this.headers.set('content-type', this._bodyBlob.type)
                } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
                    this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
                }
            }
        };

        if (support.blob) {
            this.blob = function () {
                var rejected = consumed(this);
                if (rejected) {
                    return rejected
                }

                if (this._bodyBlob) {
                    return Promise.resolve(this._bodyBlob)
                } else if (this._bodyArrayBuffer) {
                    return Promise.resolve(new Blob([this._bodyArrayBuffer]))
                } else if (this._bodyFormData) {
                    throw new Error('could not read FormData body as blob')
                } else {
                    return Promise.resolve(new Blob([this._bodyText]))
                }
            };

            this.arrayBuffer = function () {
                if (this._bodyArrayBuffer) {
                    return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
                } else {
                    return this.blob().then(readBlobAsArrayBuffer)
                }
            }
        }

        this.text = function () {
            var rejected = consumed(this);
            if (rejected) {
                return rejected
            }

            if (this._bodyBlob) {
                return readBlobAsText(this._bodyBlob)
            } else if (this._bodyArrayBuffer) {
                return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
            } else if (this._bodyFormData) {
                throw new Error('could not read FormData body as text')
            } else {
                return Promise.resolve(this._bodyText)
            }
        };

        if (support.formData) {
            this.formData = function () {
                return this.text().then(decode)
            }
        }

        this.json = function () {
            return this.text().then(JSON.parse)
        };

        return this
    }

    // HTTP methods whose capitalization should be normalized
    var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];

    function normalizeMethod(method) {
        var upcased = method.toUpperCase();
        return (methods.indexOf(upcased) > -1) ? upcased : method
    }

    function Request(input, options) {
        options = options || {};
        var body = options.body;

        if (typeof input === 'string') {
            this.url = input
        } else {
            if (input.bodyUsed) {
                throw new TypeError('Already read')
            }
            this.url = input.url;
            this.credentials = input.credentials;
            if (!options.headers) {
                this.headers = new Headers(input.headers)
            }
            this.method = input.method;
            this.mode = input.mode;
            if (!body && input._bodyInit !== null) {
                body = input._bodyInit;
                input.bodyUsed = true
            }
        }

        this.credentials = options.credentials || this.credentials || 'omit';
        if (options.headers || !this.headers) {
            this.headers = new Headers(options.headers)
        }
        this.method = normalizeMethod(options.method || this.method || 'GET');
        this.mode = options.mode || this.mode || null;
        this.referrer = null;

        if ((this.method === 'GET' || this.method === 'HEAD') && body) {
            throw new TypeError('Body not allowed for GET or HEAD requests')
        }
        this._initBody(body)
    }

    Request.prototype.clone = function () {
        return new Request(this, {body: this._bodyInit})
    };

    function decode(body) {
        var form = new FormData();
        body.trim().split('&').forEach(function (bytes) {
            if (bytes) {
                var split = bytes.split('=');
                var name = split.shift().replace(/\+/g, ' ');
                var value = split.join('=').replace(/\+/g, ' ');
                form.append(decodeURIComponent(name), decodeURIComponent(value))
            }
        });
        return form
    }

    function parseHeaders(rawHeaders) {
        var headers = new Headers();
        rawHeaders.split(/\r?\n/).forEach(function (line) {
            var parts = line.split(':');
            var key = parts.shift().trim();
            if (key) {
                var value = parts.join(':').trim();
                headers.append(key, value)
            }
        });
        return headers
    }

    Body.call(Request.prototype);

    function Response(bodyInit, options) {
        if (!options) {
            options = {}
        }

        this.type = 'default';
        this.status = 'status' in options ? options.status : 200;
        this.ok = this.status >= 200 && this.status < 300;
        this.statusText = 'statusText' in options ? options.statusText : 'OK';
        this.headers = new Headers(options.headers);
        this.url = options.url || '';
        this._initBody(bodyInit)
    }

    Body.call(Response.prototype);

    Response.prototype.clone = function () {
        return new Response(this._bodyInit, {
            status: this.status,
            statusText: this.statusText,
            headers: new Headers(this.headers),
            url: this.url
        })
    };

    Response.error = function () {
        var response = new Response(null, {status: 0, statusText: ''});
        response.type = 'error';
        return response
    };

    var redirectStatuses = [301, 302, 303, 307, 308];

    Response.redirect = function (url, status) {
        if (redirectStatuses.indexOf(status) === -1) {
            throw new RangeError('Invalid status code')
        }

        return new Response(null, {status: status, headers: {location: url}})
    };

    self.Headers = Headers;
    self.Request = Request;
    self.Response = Response;

    self.fetch = function (input, init) {
        return new Promise(function (resolve, reject) {
            var request = new Request(input, init);
            var xhr = new XMLHttpRequest();

            xhr.onload = function () {
                var options = {
                    status: xhr.status,
                    statusText: xhr.statusText,
                    headers: parseHeaders(xhr.getAllResponseHeaders() || '')
                };
                options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL');
                var body = 'response' in xhr ? xhr.response : xhr.responseText;
                resolve(new Response(body, options))
            };

            xhr.onerror = function () {
                reject(new TypeError('Network request failed'))
            };

            xhr.ontimeout = function () {
                reject(new TypeError('Network request failed'))
            };

            xhr.open(request.method, request.url, true);

            if (request.credentials === 'include') {
                xhr.withCredentials = true
            }

            if ('responseType' in xhr && support.blob) {
                xhr.responseType = 'blob'
            }

            request.headers.forEach(function (value, name) {
                xhr.setRequestHeader(name, value)
            });

            xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
        })
    };
    self.fetch.polyfill = true
})(typeof self !== 'undefined' ? self : this);

(function(doc, win) {
    var host = null;
    var source_frame = {};
    if (typeof win === 'object' && typeof win.DBSDK === 'object' && typeof win.DBSDK.API === 'object' && typeof win.DBSDK.API.host) {
        host = win.DBSDK.API.host;
    }
    win.DBSDK = {
        'API': {
            'app_id': win.DBSDK.app_id,
            'scheme': 'https',
            'host': host || 'www.designbold.com',
            'path': 'design-it/create'
        },
        'error' : ""
    };

    DBSDK.uploadImage = function(url, params, method){
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.open(method , url, true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function() {
            if(this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                var result = this.responseText.substring(0, (this.responseText.length -1 ));
                result = JSON.parse(result);
                DBbutton.addImage(result.image_info.url);

                // // Hidden notification
                DBSDK.$('#dbsdk_modal_notification').style.display = 'none';
            }
        }
        xhr.send(params);

        // Show notification when download image and insert image to editor
        DBSDK.$('#dbsdk_modal_notification').style.display = 'block';
    }

    DBSDK.getParameterByName = function (name, url) {
        if (!url) url = doc.getElementById('db-js-sdk').getAttribute('src');
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[#&]" + name + "(=([^&]*)|&|$)"),
        results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    };

    DBSDK.validateCustomDimension_ = function (width, height, unit) {
        if (isNaN(Number(width)) || isNaN(Number(height))) {
            var msg = 'Please enter a valid width / height number';
        }
        else if (unit === 'mm') {
            if (width < 13.2 || width > 1058.3 || height < 13.2 || height > 1058.3) {
                var msg = 'Width and height must has value between of 13.2 and 1058.3 milimeters';
            }
        }
        else if (unit === 'cm') {
            if (width < 1.32 || width > 105.83 || height < 1.32 || height > 105.83) {
                var msg = 'Width and height must has value between of 1.32 and 105.83 centimeters';
            }
        }
        else if (unit === 'inch' || unit === 'in') {
            if (width < 0.52 || width > 41.67 || height < 0.52 || height > 41.67) {
                var msg = 'Width and height must has value between of 0.52 and 41.67 inches';
            }
        }
        else {
            if (width < 50 || width > 4000 || height < 50 || height > 4000) {
                var msg = 'Width and height must has value between of 50 and 4000 pixels';
            }
        }
        return msg;
    };

    DBSDK.API_CREATE = DBSDK.API.scheme + '://' + DBSDK.API.host + '/' + DBSDK.API.path;
    DBSDK.COLLECTION_LIST = DBSDK.API.scheme + '://' + DBSDK.API.host + '/' + "collection/";

    DBSDK.BROWSER_UNSUPPORTED = DBSDK.API.scheme + '://' + DBSDK.API.host + "/" + "browser/unsupported";

    /* validate app id */
    DBSDK.validateApp = function (callback) {
        var app_id = DBSDK.app_id;
        if (app_id && app_id !== '') {
            win.fetch('https://api.designbold.com/pub/app/validate/' + app_id, {
                method: 'POST',
                mode: 'cors',
                redirect: 'follow'
            }).then(function (response) {
                if (response.status === 200 && typeof callback === 'function') {
                    DBSDK.API.app_id = app_id;
                    callback();
                }
            }).catch(function () {
                console.warn("Application is invalid & SDK can not be initialized.");
            });
        }
        return false;
    };

    /* override dom selector */
    DBSDK.$ = function (selector) {
        var selectorType = 'querySelectorAll';

        if (selector.indexOf('#') === 0) {
            selectorType = 'getElementById';
            selector = selector.substr(1, selector.length);
        }

        return document[selectorType](selector);
    };

    /* check if dom element is in current viewport */
    DBSDK.isElementInViewport = function (el) {

        //special bonus for those using jQuery
        if (typeof jQuery === "function" && el instanceof jQuery) {
            el = el[0];
        }

        var rect = el.getBoundingClientRect();

        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (win.innerHeight || doc.documentElement.clientHeight) && /*or $(window).height() */
            rect.right <= (win.innerWidth || doc.documentElement.clientWidth) /*or $(window).width() */
            );
    };

    /* bind event & handler on element */
    DBSDK.bindEventHandler = function (target, type, callback, useCapture) {
        useCapture = useCapture || false;
        if (target.addEventListener) {
            target.addEventListener(type, callback, useCapture);
        }
        else {
            target.attachEvent('on' + type, callback);
        }
    };
    /* unbind event handler & return callback */
    DBSDK.unbindEventHandler = function (target, type, callback, useCapture) {
        useCapture = useCapture || false;
        if (target.removeEventListener) {
            target.removeEventListener(type, callback, useCapture);
        }
        else {
            target.detachEvent('on' + type, callback);
        }
    };

    /* check if document content is ready */
    DBSDK.documentReady = function (fn) {
        if (doc.readyState !== 'loading') {
            fn();
        } else if (win.addEventListener) {
            win.addEventListener('DOMContentLoaded', fn);
        } else {
            win.attachEvent('onreadystatechange', function () {
                if (doc.readyState !== 'loading')
                    fn();
            });
        }
    };

    /* animating function */
    DBSDK.FX = {
        easing: {
            linear: function (progress) {
                return progress;
            },
            quadratic: function (progress) {
                return Math.pow(progress, 2);
            },
            swing: function (progress) {
                return 0.5 - Math.cos(progress * Math.PI) / 2;
            },
            circ: function (progress) {
                return 1 - Math.sin(Math.acos(progress));
            },
            back: function (progress, x) {
                return Math.pow(progress, 2) * ((x + 1) * progress - x);
            },
            bounce: function (progress) {
                for (var a = 0, b = 1, result; 1; a += b, b /= 2) {
                    if (progress >= (7 - 4 * a) / 11) {
                        return -Math.pow((11 - 6 * a - 11 * progress) / 4, 2) + Math.pow(b, 2);
                    }
                }
            },
            elastic: function (progress, x) {
                return Math.pow(2, 10 * (progress - 1)) * Math.cos(20 * Math.PI * x / 3 * progress);
            }
        },
        animate: function (options) {
            options = options || {};
            var start = new Date;
            var id = setInterval(function () {
                var timePassed = new Date - start;
                var progress = timePassed / options.duration;
                if (progress > 1) {
                    progress = 1;
                }
                options.progress = progress;
                var delta = options.delta(progress);
                options.step(delta);
                if (progress === 1) {
                    clearInterval(id);
                    options.complete();
                }
            }, options.delay || 10);
        },
        fadeOut: function (element, options) {
            options = options || {};
            var to = 1;
            this.animate({
                duration: options.duration || 400,
                delta: function (progress) {
                    progress = this.progress;
                    return DBSDK.FX.easing.swing(progress);
                },
                complete: options.complete || function () {
                },
                step: function (delta) {
                    element.style.opacity = to - delta;
                }
            });
        },
        fadeIn: function (element, options) {
            options = options || {};
            var to = 0;
            this.animate({
                duration: options.duration || 400,
                delta: function (progress) {
                    progress = this.progress;
                    return DBSDK.FX.easing.swing(progress);
                },
                complete: options.complete || function () {
                },
                step: function (delta) {
                    element.style.opacity = to + delta;
                }
            });
        }
    };

    /* create unique id */
    DBSDK.guid = function () {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }

        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
    };

    /* trigger create or open design frame */
    DBSDK.startDesignTool = function (e) {
        var designit_uri = e.currentTarget.getAttribute('data-href'),
        uuid = e.currentTarget.getAttribute('data-id'),
        overlay = DBSDK.$('.db-overlay[data-id="' + uuid + '"]');
        if (overlay.length) {
            overlay[0].style.display = 'block';
        }
        else {
            var iframe = doc.createElement('iframe');
            iframe.style.display = 'none';
            iframe.setAttribute('data-id', uuid);
            iframe.width = '100%';
            iframe.height = '100%';
            iframe.src = designit_uri;
            iframe.name = 'db-design-frame-' + uuid;
            iframe.id = 'db-design-frame-' + uuid;
            var iframeOnLoad = function () {
                if (iframe.removeEventListener) {
                    iframe.removeEventListener('load', null, true);
                }
                else if (iframe.detachEvent) {
                    iframe.detachEvent('onload', null);
                }
                iframe.style.display = 'block';
                DBSDK.$('.db-overlay[data-id="' + uuid + '"] .db-loading')[0].style.display = 'none';
            };
            source_frame = iframe;
            DBSDK.unbindEventHandler(iframe, 'load', iframeOnLoad, true);
            DBSDK.bindEventHandler(iframe, 'load', iframeOnLoad, true);
            var overlay = '<div class="db-overlay animated fadeIn" data-id="' + uuid + '" style="display: block;">'
            + '<span class="db-close-lightbox">x</span>'
            + '<div class="db-lightbox">'
            + '<div class="db-loading">'
            + '<div class="inner-circles-loader large loading-icon"></div>'
            + '</div>'
            + '</div>'
            + '</div>';
            doc.body.insertAdjacentHTML('beforeend', overlay);
            DBSDK.$('.db-overlay[data-id="' + uuid + '"] .db-lightbox')[0].appendChild(iframe);
            DBSDK.bindEventHandler(DBSDK.$('.db-overlay[data-id="' + uuid + '"] .db-close-lightbox')[0], 'click', function (e) {
                e.currentTarget.parentNode.style.display = 'none';
                window.parent.postMessage({"action":""})
            });
        }
    };

    DBSDK.startDesignToolExtension = function (designit_uri,uuid, param) {
        var iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.setAttribute('data-id', uuid);
        iframe.width = '100%';
        iframe.height = '100%';
        iframe.src = designit_uri;
        iframe.name = 'db-design-frame-' + uuid;
        iframe.id = 'db-design-frame-' + uuid;

        var lightbox = '<div class="db-lightbox" data-id="'+ uuid +'">'
        + '<div class="db-loading">'
        + '<div class="inner-circles-loader large loading-icon"></div>'
        + '</div>'
        + '<span class="db-close-lightbox">x</span>'
        + '</div>';
        DBSDK.$('.db-overlay')[0].insertAdjacentHTML('beforeend', lightbox);
        source_frame = iframe;
        var iframeOnLoad = function () {
            if (iframe.removeEventListener) {
                iframe.removeEventListener('load', null, true);
            }
            else if (iframe.detachEvent) {
                iframe.detachEvent('onload', null);
            }
            iframe.style.display = 'block';
            DBSDK.$('.db-overlay .db-lightbox[data-id="' + uuid + '"] .db-loading')[0].style.display = 'none';
        };

        DBSDK.unbindEventHandler(iframe, 'load', iframeOnLoad, true);
        DBSDK.bindEventHandler(iframe, 'load', iframeOnLoad, true);
        DBSDK.$('.db-overlay .db-lightbox[data-id="' + uuid + '"]')[0].appendChild(iframe);

        DBSDK.bindEventHandler(DBSDK.$('.db-overlay .db-lightbox[data-id="' + uuid + '"] .db-close-lightbox')[0], 'click', function (e) {
            DBSDK.layoutHistory.add({"data" : uuid, "img" : param.thumb_d4});
            e.currentTarget.parentNode.style.display = 'none';
            DBSDK.$('.db-overlay .fix-favorite')[0].style.display = 'block';
        });
    };

    /* build design button uri create */
    DBSDK.buildButtonUri = function (image, doctype, layout, width, height, unit, type) {
        image = image || '';
        doctype = doctype || '';
        layout = layout || '';
        width = width || 0;
        height = height || 0;
        unit = unit || 'px';
        var uri = '';
        if (image !== '') {
            uri = DBSDK.API_CREATE + '/image/w' + width + '/h' + height + '/' + win.btoa(image);
            if (doctype != ""){
                uri = DBSDK.API_CREATE + '/image/dt-' + doctype + '/' + win.btoa(image);
            }
            else{
                uri = DBSDK.API_CREATE + '/image/w' + width + '/h' + height + '/' + win.btoa(image);
            }
        }
        else if (doctype !== '' || layout !== '') {
            uri = DBSDK.API_CREATE;
            if (doctype !== '') {
                uri += '/' + doctype;
            }
            else {
                uri += '/dt';
            }
            if (layout !== '') {
                uri += '/' + layout;
            }
        }
        else {
            uri = DBSDK.API_CREATE + '/custom/' + width + '/' + height + '/' + unit;
        }
        var query = [];
        if (DBSDK.API.app_id !== '') {
            query.push('app_id=' + DBSDK.API.app_id);
        }
        if (query.length > 0) {
            for (var i = 0; i < query.length; i++) {
                uri += (i === 0 ? '?' : '&') + query[i];
            }
        }
        return uri;
    };

    DBSDK.buildButtonUriEdit = function (docid) {

        var uri = '';
        uri = DBSDK.API_CREATE + '/edit/' + docid;
        var query = [];
        if (DBSDK.API.app_id !== '') {
            query.push('app_id=' + DBSDK.API.app_id);
        }
        if (query.length > 0) {
            for (var i = 0; i < query.length; i++) {
                uri += (i === 0 ? '?' : '&') + query[i];
            }
        }
        return uri;
    };

    DBSDK.buildButtonUriCopy = function (docid) {
        var uri = '';
        uri = DBSDK.API_CREATE + '/copy/' + docid;
        var query = [];
        if (DBSDK.API.app_id !== '') {
            query.push('app_id=' + DBSDK.API.app_id);
        }
        if (query.length > 0) {
            for (var i = 0; i < query.length; i++) {
                uri += (i === 0 ? '?' : '&') + query[i];
            }
        }
        return uri;
    };

    DBSDK.buildUnsupportedUrl = function () {
        return DBSDK.BROWSER_UNSUPPORTED;
    };


    var DBMessageListener = function (e) {
        var action = e.data.action || '',
        frame = e.data.frame || '',
        design_frame, uuid, img, href;
        if (action === '#db#design-button#getconfig') {
            if (!!source_frame) {
                source_frame.contentWindow.postMessage({
                    action: '#db#designit#config',
                    config: DBSDK.config
                }, '*');
            }
        }
        else if (action === '#db#design-button#getconfiglogin') {
            if (!DBSDK.config.hasOwnProperty('auth')){
                DBSDK.config.auth = {};
            }
            if (!!source_frame) {
                source_frame.contentWindow.postMessage({
                    action: '#db#designit#configlogin',
                    config: DBSDK.config.auth
                }, '*');
            }
        }
        else if (action === '#db#design-button#export-callback') {
            if (typeof DBSDK.exportCallback === 'function') {
                design_frame = doc.getElementsByName(frame);
                if (design_frame.length) {
                    var downloadUrl = e.data.src || null;
                    var document_id = e.data.document_id || null;
                    uuid = design_frame[0].getAttribute('data-id');
                    var btn = DBSDK.$('.db-btn-designit[data-id="' + uuid + '"]')[0];
                    var previewTarget = false;
                    if (typeof btn == 'object'){
                        previewTarget = btn.getAttribute('data-db-preview-target');
                    }
                    // hide the iframe modal
                    DBSDK.$('.fix-favorite .db-close-lightbox')[0].click();
                    setTimeout(function () {
                        var output  = {buttonId:uuid};
                        if (previewTarget) {
                            output.previewTarget = previewTarget;
                        }
                        DBSDK.exportCallback(downloadUrl,document_id,output);
                    }, 0);
                }
            }
        }
        else if (action === '#db#design-button#quit') {
            design_frame = doc.getElementsByName(frame);
            if (design_frame.length) {
                uuid = design_frame[0].getAttribute('data-id');
                var overlay = DBSDK.$('.db-overlay[data-id="' + uuid + '"]')[0];
                overlay.parentNode.removeChild(overlay);
            }
        }
        else if (action === '#db#design-button#logout') {
            href = e.data.href || '';
            design_frame = doc.getElementsByName(frame);
            if (design_frame.length) {
                // cancel preview if user logged out
                // ...
                // create iframe to logout
                var iframe = doc.createElement('iframe');
                iframe.style.display = 'none';
                iframe.onload = function (e) {
                    doc.body.removeChild(iframe);
                };
                iframe.src = href;
                doc.body.appendChild(iframe);
                // remove all design it overlay
                var overlays = DBSDK.$('.db-overlay');
                for (var i = 0; i < overlays.length; i++) {
                    doc.body.removeChild(overlays[i]);
                }
            }
        }
        else if (action === '#db#design-button#getimagesize') {
            href = e.data.href || '';
            design_frame = doc.getElementsByName(frame);
            if (design_frame.length) {
                uuid = design_frame[0].getAttribute('data-id');
                img = DBSDK.$('.db-btn-designit[data-id="' + uuid + '"]')[0];
                DBSDK.$('.db-overlay[data-id="' + uuid + '"] iframe')[0].contentWindow.postMessage({
                    action: '#db#designit#imagesize',
                    width: img.naturalWidth || img.offsetWidth,
                    height: img.naturalHeight || img.offsetHeight
                }, '*');
            }
        }
        else if (action === '#db#design-button#start_design_tool') {
            var image = e.data.image || '';
            var param = e.data.param || '';
            startDesignTool(image,param);
        }
    };
    DBSDK.unbindEventHandler(window, 'message', DBMessageListener, false);
    DBSDK.bindEventHandler(window, 'message', DBMessageListener, false);

    /* reload button */
    DBSDK.documentReady(function () {
        if (win.DBSDK_Cfg.hasOwnProperty('export_callback')) {
            DBSDK.exportCallback = win.DBSDK_Cfg.export_callback;
        }
        DBSDK.config = JSON.parse(JSON.stringify(win.DBSDK_Cfg)) || {};
    });


    // API
    DBSDK.dataResponse = {};
    DBSDK.layoutHistory = {
        lightbox : [],
        add : function(obj){
            this.lightbox.push(obj);
        },
        remove : function(data){
            for(var item in this.lightbox){
                if(this.lightbox[item].data === data){
                    let index = this.lightbox.indexOf(item);
                    this.lightbox.splice(index, 1);
                }
            }
        }
    };
    DBSDK.uuid = '';

    DBSDK.settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api-alpha.designbold.com/v3/user/recent_doctype",
        "method": "GET",
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Bearer b0f99ceb3d596cb8e7152088548c41e981920c0bd92312047fd8e75b9eee440d",
            "Cache-Control": "no-cache",
            "Postman-Token": "683ceb2d-777b-4005-98ad-fefa7a7c9d37"
        }
    }

    DBSDK.startOverlay = function () {
        // get post_id form wordpress post
        var overlay = DBSDK.$('.db-overlay')[0];
        if (overlay) {
            overlay.style.display = 'block';
        }else{
            var modal = '<div id="dbsdk_modal_notification" class="fadeIn">'
            + '<div id="modal_notification" class="modal">'
            + '<div class="db-loading">'
            + '<p>Please wait download image...</p>'
            + '<div class="inner-circles-loader large loading-icon"></div>'
            + '</div>'
            + '</div>'
            + '</div>';
            let overlay = modal + '<div class="db-overlay animated fadeIn" style="display: block;"></div>';
            doc.body.insertAdjacentHTML('beforeend', overlay);

            var favorite = '<div class="fix-favorite">'
            + '<div class="db-loading">'
            + '<div class="inner-circles-loader large loading-icon"></div>'
            + '</div>'
            + '<span class="db-close-lightbox">x</span>'
            + '</div>';
            DBSDK.$('.db-overlay')[0].insertAdjacentHTML('beforeend', favorite);

            // Load data API
            var loadXMLDoc = new Promise (function (resolve, reject){
                var data = null;
                var xhr = new XMLHttpRequest();
                xhr.withCredentials = false;

                xhr.onreadystatechange = function() {
                    if (xhr.readyState === 4 ) {
                        if(xhr.status == 200){
                            resolve(this.response);
                        }else{
                            reject(this.statusText);
                        }
                    }
                }

                xhr.open("GET", "https://api.designbold.com/v3/user/recent_doctype", true);
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                xhr.setRequestHeader("Authorization", "Bearer b0f99ceb3d596cb8e7152088548c41e981920c0bd92312047fd8e75b9eee440d");

                xhr.send(data);
            });

            // Generate data API
            loadXMLDoc.then(function (value) {
                DBSDK.dataResponse = value;
                var mainDiv = doc.createElement('div');
                mainDiv.style.display = 'none';
                mainDiv.style.width = '100%';
                mainDiv.style.height = '100%';
                mainDiv.name = 'db-design-frame-favorite';
                mainDiv.id = 'db-design-frame-favorite';
                source_frame = mainDiv;

                var mainDivOnLoad = function () {
                    if (mainDiv.removeEventListener) {
                        mainDiv.removeEventListener('load', null, true);
                    }
                    else if (mainDiv.detachEvent) {
                        mainDiv.detachEvent('onload', null);
                    }
                    mainDiv.style.display = 'block';
                    DBSDK.$('.db-overlay .fix-favorite .db-loading')[0].style.display = 'none';
                };

                DBSDK.unbindEventHandler(mainDiv, 'load', mainDivOnLoad, true);
                DBSDK.bindEventHandler(mainDiv, 'load', mainDivOnLoad, true);

                // Append html
                mainDiv.appendChild(DBSDK.dataPopular(DBSDK.dataResponse));
                mainDiv.appendChild(DBSDK.dataAll(DBSDK.dataResponse));
                mainDiv.appendChild(DBSDK.boxOption());
                // End append html

                DBSDK.$('.db-overlay .fix-favorite')[0].appendChild(mainDiv);

                DBSDK.bindEventHandler(DBSDK.$('.db-overlay .fix-favorite .db-close-lightbox')[0], 'click', function (e) {
                    var el = e.currentTarget.parentNode.parentNode;
                    el.style.display = 'none';
                    // window.parent.postMessage({action:"#db-extension#design-button#close"},"*");
                });
            });
        }
    };

    DBSDK.dataPopular = function(data){
        var block = document.createElement("div");
        block.id = 'popular';
        block.className = 'list-doctype-first';

        var obj_data = JSON.parse(data);
        var dataP = obj_data.response.header_doctype;

        var inner = document.createElement("div");
        inner.className = 'list-doctype-first-inner';

        var str = '<h2>What do you want to design today?</h2>'
        + '<div class="col-wrap">';

        for (let item in dataP) {
            if(item < 6){
                str += '<div class="col">'
                + '<div class="doctype-item">'
                + '<a href="javascript:" onClick = "DBSDK.getAttribule(this)" class="add_design" id="'+ dataP[item].slug +'" tabindex="0">'
                + '<div class="ri-img">'
                + '<img class="animated fadeIn" src="' + dataP[item].thumb_d4 + '" width="'+ dataP[item].thumb_w +'" height="'+ dataP[item].thumb_h +'">'
                + '</div>'
                + '<div class="ri-des">'
                + '<p>' + dataP[item].title + '</p>'
                + '<strong>' + dataP[item].size + '</strong>'
                + '</div>'
                + '</a>'
                + '</div>'
                + '</div>';
            }
        }

        str+= '</div>';

        inner.insertAdjacentHTML('beforeend', str + '<div class="clearfix"></div>');
        inner.appendChild(DBSDK.fsControl());

        block.appendChild(inner);
        return block;
    }

    DBSDK.dataAll = function(data, uuid){
        var block = document.createElement("div");
        block.className = 'content-choose hidden';
        block.id = 'all';
        block.style.display = 'none';
        var str = '';
        var obj_data = JSON.parse(data);
        var dataA = obj_data.response.header_all_doctype;

        for (let item in dataA) {
            str+= '<h3 class="favorite-caption"><span>'+ dataA[item].title +'</span></h3>';
            if(dataA[item].items){
                str+= '<ul class="list_design">';
                for(let item_child in dataA[item].items){
                    let child = dataA[item].items[item_child];
                    str+= '<li>'
                    + '<a href="javascript:" onClick = "DBSDK.getAttribule(this)"  target="_blank" class="add_design" id="'+ child.slug +'">'
                    + '<div class="block_list_design">'
                    + '<img class="animated fadeIn" src="'+ child.thumb_d4 +'" width="'+ child.thumb_w +'" height="'+ child.thumb_h +'">'
                    + '<div class="name_design">'
                    + '<div class="tit_design">'+ child.title
                    + '<span data-toggle="tooltip" title="'+ child.title +'">'
                    + '<i class="fa fa-user"></i>'+ child.editing
                    + '</span>'
                    + '</div>'
                    + '<div class="size_layout">'+ child.width +'x'+ child.height +' px</div>'
                    + '</div>'
                    + '</div>'
                    + '</a>'
                    + '</li>';
                }
                str+= '</ul>';
            }
        }
        block.insertAdjacentHTML('beforeend', str);

        var blockNav = document.createElement('div');
        blockNav.className = 'box-dimen-inner';

        var customSize = document.createElement('div');
        customSize.className = 'customer-size';

        customSize.appendChild(DBSDK.btnOption());
        blockNav.appendChild(customSize);
        block.appendChild(blockNav);

        return block
    }

    // show layout history
    DBSDK.displayLayoutHistory = function(){
        let lightbox = DBSDK.layoutHistory.lightbox;
        let length = DBSDK.layoutHistory.lightbox.length;
        if(length > 0){
            let div = document.createElement('div');
            div.className = 'layoutHistory';

            let i = 0;
            let html = '';
            for (i ; i < length; i++) {
                // html+= '<div class="item">'
                // + '<img src="" style="cursor: pointer;"'
                // + '</div>';
                // lightbox[i]
            }
        }
    }

    DBSDK.justLayout = function(){

    }

    DBSDK.getAttribule = function(e){
        let blogId = e.getAttribute('id');
        let thumb = e.querySelectorAll('img')[0].src;
        let image_src = '';
        let param = {
            doc_type : blogId,
            thumb_d4 : thumb
        };

        DBSDK.$('.db-overlay .fix-favorite')[0].style.display = 'none';

        startDesignTool(image_src, param);
    }

    // Create fsControl
    DBSDK.fsControl = function(){
        var fs = document.createElement('div');
        fs.className = 'fs-control-create';

        var span = document.createElement('span');
        span.textContent = 'or';

        fs.appendChild(DBSDK.bntViewAll());
        fs.appendChild(span);
        fs.appendChild(DBSDK.btnOption());

        return fs;
    }

    // Create button view all
    DBSDK.bntViewAll = function(){
        var btn_viewAll = document.createElement('a');
        btn_viewAll.className = 'my-btn';
        btn_viewAll.href = 'javascript:';
        btn_viewAll.textContent = 'View all doctypes';

        DBSDK.bindEventHandler(btn_viewAll, 'click', function(e){
            let active_tab1 = document.getElementById('popular');
            active_tab1.style.display = 'none';
            let active_tab2 = document.getElementById('all');
            active_tab2.style.display = 'block';
        });

        return btn_viewAll;
    }

    // Create button view all
    DBSDK.bntViewAllDoctype = function(){
        var btn = document.createElement('a');
        btn.href = 'javascript:';
        btn.textContent = 'Choose other doctype';

        DBSDK.bindEventHandler(btn, 'click', function(e){
            let tab1 = document.getElementById('popular');
            tab1.style.display = 'none';

            let tab2 = document.getElementById('all');
            tab2.style.display = 'block';

            let tab3 = document.getElementById('blockOption');
            tab3.style.display = 'none';
        });

        return btn;
    }

    // Create button select option
    DBSDK.btnOption = function(){
        var btn_option = document.createElement('a');
        btn_option.href = 'javascript:';
        btn_option.textContent = 'Custom Dimensions';

        DBSDK.bindEventHandler(btn_option, 'click', function(e){
            document.getElementById('popular').style.display = 'none';
            document.getElementById('all').style.display = 'none';
            document.getElementById('blockOption').style.display = 'flex';
        });

        return btn_option;
    }

    // Create button create design
    DBSDK.createDesign = function(){
        var btn = document.createElement('a');
        btn.href = 'javascript:';
        btn.className = 'form-control';
        btn.textContent = 'Create design!';

        DBSDK.bindEventHandler(btn, 'click', function(e){
            let width = DBSDK.$('.fix-favorite .customer-size .custome_width')[0].value;

            let height = DBSDK.$('.fix-favorite .customer-size .custome_height')[0].value;

            let unit = DBSDK.$('.fix-favorite .customer-size .custome_unit')[0].value;

            let notify = DBSDK.$('.fix-favorite .customer-size .notify')[0];

            let msg = DBSDK.validateCustomDimension_(width, height, unit);

            if(typeof msg === 'undefined'){
                notify.textContent = '';

                DBSDK.$('.db-overlay .fix-favorite')[0].style.display = 'none';

                let param = {
                    'doc_type' : 'blog-graphic',
                    'width' : width,
                    'height' : height,
                    'unit' : unit
                };

                startDesignTool("", param);
            }else{
                notify.textContent = msg;
            }
        });

        return btn;
    }

    DBSDK.boxOption = function(){
        var block = document.createElement("div");
        block.id = 'blockOption';
        block.className = 'list-doctype-first';
        block.style.display = 'none';

        var inner = document.createElement("div");
        inner.className = 'list-doctype-first-inner';

        var boxInner = document.createElement("div");
        inner.className = 'box-dimen-inner';

        var customSize = document.createElement("div");
        customSize.className = 'customer-size';

        let htmlCustomSize = '<input class="custome_width" type="text" name="width" data-value="0" placeholder="Width" class="form-control">'
        + '<span>x</span>'
        + '<input class="custome_height" type="text" name="height" data-value="0" placeholder="Height" class="form-control">'
        + '<select class="custome_unit" name="unit" class="form-control" data-value="px">'
        + '<option value="px">px</option>'
        + '<option value="in">inch</option>'
        + '<option value="cm">cm</option>'
        + '<option value="mm">mm</option>'
        + '</select>';
        customSize.insertAdjacentHTML('beforeend', htmlCustomSize);
        customSize.appendChild(DBSDK.createDesign());
        customSize.insertAdjacentHTML('beforeend', '<div class="notify"></div>');

        var btn_choose_other_doctype = document.createElement("p");
        btn_choose_other_doctype.className = 'choose_doctype_other';
        btn_choose_other_doctype.appendChild(DBSDK.bntViewAllDoctype());

        boxInner.appendChild(customSize);
        boxInner.appendChild(btn_choose_other_doctype);

        inner.insertAdjacentHTML('beforeend', '<h2>Use Custom Dimensions</h2>');
        inner.appendChild(boxInner);

        block.appendChild(inner);

        return block;
    }
})(document, window);

var startDesignTool = function(image_src, param){
    if (typeof param != "object"){
        var doc_type = "blog-graphic";
        var thumb_d4 = "";
    }
    else{
        var doc_type = param.doc_type
        var thumb_d4 = param.thumb_d4
    }
    var status = 1;
    if (image_src == ""){
        if(!("width" in param)){
            var designit_uri = DBSDK.buildButtonUri(null,doc_type,null,null,null,null,"button");
        }else{
            var designit_uri = DBSDK.buildButtonUri(null,null,null,param.width,param.height,param.unit,"button");
        }
    }
    else{
        status = 1;
        var designit_uri = DBSDK.buildButtonUri(image_src,doc_type,null,null,null,null,"button");
    }
    var uuid = DBSDK.guid();
    DBSDK.uuid = uuid;
    if (status){
        DBSDK.startDesignToolExtension(designit_uri, uuid, param);
    }
    else{
        window.open(designit_uri,'_blank');
    }
};

DBWP5.startDesignTool = (id) => {
    console.log(id);
}