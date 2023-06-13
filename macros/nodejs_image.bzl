"""
A macro, which creates a container_image from a ts_project
"""

load("@aspect_rules_js//js:defs.bzl", "js_binary", "js_image_layer")
load("@aspect_bazel_lib//lib:transitions.bzl", "platform_transition_filegroup")
load("@rules_oci//oci:defs.bzl", "oci_image", "oci_tarball")

APP_DIR_NAME = "app"

def nodejs_image(data, entry_point, base, **kwargs):
    """
    A macro, which creates a container_image from a ts_project

    Args:
      data: input data for binary (e.g. ts_project or other scripts)
      entry_point: the main javascript file which will be run
      base: reference to the oci_pull base image
      **kwargs: common arguments like name
    """
    name = kwargs.get("name", None)

    js_layers_name = "%s_layers" % name
    app_tar_name = "%s_app_tar" % name
    js_binary_name = "%s_bin" % name
    image_name = "%s_image" % name

    js_binary(
        name = js_binary_name,
        data = data,
        entry_point = entry_point,
    )

    js_image_layer(
        name = js_layers_name,
        binary = js_binary_name,
        root = "/%s" % APP_DIR_NAME,
        tags = [],
    )

    native.platform(
        name = "amd64_linux",
        constraint_values = [
            "@platforms//os:linux",
            "@platforms//cpu:x86_64",
        ],
    )

    platform_transition_filegroup(
        name = "transitioned_layers",
        srcs = [js_layers_name],
        target_platform = ":amd64_linux",
    )

    native.filegroup(
        name = app_tar_name,
        srcs = [js_layers_name],
        output_group = APP_DIR_NAME,
    )

    # LATER creation time stamping
    # https://github.com/bazel-contrib/rules_oci/issues/49
    oci_image(
        name = image_name,
        architecture = "amd64",
        base = base,
        cmd = ["/%s/%s/%s" % (APP_DIR_NAME, native.package_name(), js_binary_name)],
        entrypoint = ["bash"],
        os = "linux",
        tars = [":transitioned_layers"],
    )

    oci_tarball(
        image = image_name,
        **kwargs
    )
