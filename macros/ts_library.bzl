"""
A macro, that compiles typescript to javascript with swc
"""

load("@aspect_rules_ts//ts:defs.bzl", "ts_project")
load("@aspect_rules_swc//swc:defs.bzl", "swc")
load("@bazel_skylib//lib:partial.bzl", "partial")

def ts_library(srcs, deps = [], **kwargs):
    """
    A macro, that compiles typescript to javascript with swc

    Args:
      srcs: typescript source files
      deps: typescript dependencies
      **kwargs: common arguments like name
    """
    ts_project(
        srcs = srcs,
        declaration = True,
        transpiler = partial.make(
            swc,
            swcrc = "//:swcrc",
        ),
        tsconfig = "//:tsconfig",
        deps = deps,
        **kwargs
    )
