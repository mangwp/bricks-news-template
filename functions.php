<?php 
/**
 * Register/enqueue custom scripts and styles
 */
add_action( 'wp_enqueue_scripts', function() {
	// Enqueue your files on the canvas & frontend, not the builder panel. Otherwise custom CSS might affect builder)
	if ( ! bricks_is_builder_main() ) {
		wp_enqueue_style( 'bricks-child', get_stylesheet_uri(), ['bricks-frontend'], filemtime( get_stylesheet_directory() . '/style.css' ) );
	}
  wp_enqueue_style( 'my-framework', get_stylesheet_directory_uri() . '/framework/app.min.css' );
  wp_enqueue_style( 'my-layout', get_stylesheet_directory_uri() . '/assets/css/layout.css' );
  wp_enqueue_style( 'my-responsive', get_stylesheet_directory_uri() . '/assets/css/responsive.css' );
  wp_enqueue_style( 'my-font', get_stylesheet_directory_uri() . '/assets/font/font.css' );
  wp_enqueue_script( 'my-custom', get_stylesheet_directory_uri() . '/assets/js/custom.js', array('jquery'), '1.0.0', true );


} );

/**
 * Register custom elements
 */
add_action( 'init', function() {
  $element_files = [
    __DIR__ . '/elements/title.php',
  ];

  foreach ( $element_files as $file ) {
    \Bricks\Elements::register_element( $file );
  }
}, 11 );

/**
 * Add text strings to builder
 */
add_filter( 'bricks/builder/i18n', function( $i18n ) {
  // For element category 'custom'
  $i18n['custom'] = esc_html__( 'Custom', 'bricks' );

  return $i18n;
} );

/*Disable Gutenberg*/
add_filter('use_block_editor_for_post', '__return_false', 10);

// Show post tags with link and a custom separator// use {echo:wpdocs_show_tags}
function wpdocs_show_tags()
{
  $post_tags = get_the_tags();
  $separator = '';
  $output = '';

  if (!empty($post_tags)) {
    foreach ($post_tags as $tag) {
      $output .= '<span><a href="' . esc_attr(get_tag_link($tag->term_id)) . '" class="btn-small btn-grey mgr-4 mgb-4">' . __($tag->name) . '</a></span>' . $separator;
    }
  }

  return trim($output, $separator);
}
// Create and value to customfield each page visited by user (Most View)//
function wpb_set_post_views($postID) {
  $count_key = 'jumlah_dilihat';
  $count = get_post_meta($postID, $count_key, true);
  if($count==''){
      $count = 10;
      delete_post_meta($postID, $count_key);
      add_post_meta($postID, $count_key, '10');
  }else{
      $count++;
      update_post_meta($postID, $count_key, $count);
  }
}

//To keep the count accurate, lets get rid of prefetching
remove_action( 'wp_head', 'adjacent_posts_rel_link_wp_head', 10, 0);
function wpb_track_post_views ($post_id) {
  if ( !is_single() ) return;
  if ( empty ( $post_id) ) {
      global $post;
      $post_id = $post->ID;    
  }
  wpb_set_post_views($post_id);
}
add_action( 'wp_head', 'wpb_track_post_views');

function acf_read_only_field($field)
{
    if (is_admin()) {
      $field['readonly'] = true;
    }
  return $field;
}

add_filter('acf/load_field/name=jumlah_dilihat', 'acf_read_only_field');

//Display Most Used Tag in Last 7 Days//
function most_use_tags()
{
  global $wpdb;
$term_ids = $wpdb->get_col("
    SELECT term_id FROM $wpdb->term_taxonomy
    INNER JOIN $wpdb->term_relationships ON $wpdb->term_taxonomy.term_taxonomy_id=$wpdb->term_relationships.term_taxonomy_id
    INNER JOIN $wpdb->posts ON $wpdb->posts.ID = $wpdb->term_relationships.object_id
    WHERE DATE_SUB(CURDATE(), INTERVAL 30 DAY) <= $wpdb->posts.post_date");

if(count($term_ids) > 0){

  $tags = get_tags(array(
    'orderby' => 'count',
    'order'   => 'DESC',
    'number'  => 7,
    'include' => $term_ids,
  ));
  $output .= '<ul class="pd-0 flex-wrap gap-8">';
foreach ( (array) $tags as $tag ) {
  $output .= '<li><a href="' . get_tag_link ($tag->term_id) . '" rel="tag" class="btn-small btn-grey mgr-4 mgb-4">' . $tag->name . '</a></li>';
};
$output .= '</ul>';

}

  return $output;
}