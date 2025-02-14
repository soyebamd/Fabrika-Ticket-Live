<?php

if(is_page('love-inferno-ticket') || is_page('love-inferno-ticket-2')){
$menu = [
    'Fabrika Easter Dinner Menu' => [
        'Three Course Menu',
        '(Add quantity to the quantity box. The radio button will highlight when completed.)'
    ],
    'First Course' => [
        ['course_name'=>'Appetizers (select one)'],
        ['title' => 'Curry Shrimp Caesar', 'ingredients' => 'Grilled Shrimp, Romaine, Curry Caesar Dressing, Croutons, Parmesan Cheese, Cherry Tomatoes'],
        ['title' => 'Greek Salad', 'ingredients' => 'Cucumbers, Red Onion, Feta Cheese, Tomatoes, Kalamata Olives, House Vinaigrette'],
      
        ['title' => 'Arancini', 'ingredients' => 'Fried Parmesan Arancini served with a Creamy Cauliflower Sauce'],
        ['title' => 'Fried Queso ', 'ingredients' => 'Fried Queso Manchego Cheese Served with Lime Crema'],

    ],
    'Second Course' => [

        ['course_name'=>'Main Course (select one)' ],        
        ['title' => 'Hanger Steak', 'ingredients' => 'Juicy hanger steak, marinated in a blend of Worcestershire sauce, maple syrup, and soy sauce. Served with fingerling potato, broccolini, and a comforting ladle of savory beef gravy.'],
        ['title' => 'Branzino', 'ingredients' => 'Fresh branzino delicately seasoned and served with creamy parmesan couscous, grilled asparagus, and a velvety miso-based sauce. (PSC)'],
        ['title' => 'Cauliflower Steak', 'ingredients' => ' Thick-cut cauliflower steak grilled to perfection and served with a parmesan sauce and miso cream, with a teriyaki glaze.'],
    
      
    ],
    'Third Course' => [
        ['course_name'=>'Dessert (select one)' ],        
        ['title' => 'Tiramisu', 'ingredients' => 'Layers of coffee-soaked ladyfingers and creamy mascarpone, finished with a hint of cognac. An irresistible Italian Classic that’ll whisk you away to coffee heaven.'],
        ['title' => 'Matcha Ice Cream', 'ingredients' => 'Homemade Matcha ice Cream served with Wasabi Meringue'],
    
      
    ] 
  
];
}

else {
   $menu = [
    'Fabrika Easter Dinner Menu' => [
        'Three Course Menu',
        '(Add quantity to the quantity box. The radio button will highlight when completed.)'
    ],
    'First Course' => [
        ['course_name'=>'Select one per person'],
        ['title' => 'Curry Shrimp Caesar', 'ingredients' => 'Grilled Shrimp, Romaine, Curry Caesar Dressing, Croutons, Parmesan Cheese, Cherry Tomatoes'],
        ['title' => 'Greek Salad', 'ingredients' => 'Cucumbers, Red Onion, Feta Cheese, Tomatoes, Kalamata Olives, House Vinaigrette']
    ],
    'Second Course' => [
        ['course_name'=>'Appetizers (select one)'],
        ['title' => 'Arancini', 'ingredients' => 'Fried Parmesan Arancini served with a Creamy Cauliflower Sauce'],
        ['title' => 'Fried Queso ', 'ingredients' => 'Fried Queso Manchego Cheese Served with Lime Crema'],

    ],
    'Third Course' => [
        ['course_name'=>'Main Course (select one)' ],        
        ['title' => 'Hanger Steak', 'ingredients' => 'Juicy hanger steak, marinated in a blend of Worcestershire sauce, maple syrup, and soy sauce. Served with fingerling potato, broccolini, and a comforting ladle of savory beef gravy.'],
        ['title' => 'Branzino', 'ingredients' => 'Fresh branzino delicately seasoned and served with creamy parmesan couscous, grilled asparagus, and a velvety miso-based sauce. (PSC)'],
        ['title' => 'Cauliflower Steak', 'ingredients' => ' Thick-cut cauliflower steak grilled to perfection and served with a parmesan sauce and miso cream, with a teriyaki glaze.'],
    
      
    ]
  
];
}
?>

<div id="menu">
    <h2><?= $menu['Fabrika Easter Dinner Menu'][0] ?></h2>
    <p><strong><?= $menu['Fabrika Easter Dinner Menu'][1] ?></strong></p>

    <?php foreach ($menu as $course => $items): ?>
        <?php if ($course != 'Fabrika Easter Dinner Menu'): ?>
            <section style="border-bottom:solid 1px">
                <h3><?= $course ?></h3>

                
                


                <?php foreach ($items as $item): ?>
                     <p><?= $item['course_name'] ?></p>
                     <?php if (!$item['course_name']){ ?>
                    <article>
                        <div class="d-flex">
                            <div class="titleWrapper">
                                <input type="checkbox" name="<?= strtolower(str_replace(' ', '-', $course)) ?>" id="<?= strtolower(str_replace(' ', '-', $item['title'])) ?>" value="<?= $item['title'] ?>" class="ingredients-title">
                                <span class="radio-box"></span>
                                <label for="<?php //= strtolower(str_replace(' ', '-', $item['title'])) ?>">
                                    <p><strong><?= $item['title'] ?></strong></p>
                                </label>
                            </div>
                            <select class="menu-quantity" data-coursename= "<?= strtolower(str_replace(' ', '-', $course)) ?>" name="<?= strtolower(str_replace(' ', '-', $item['title'])) ?>">
                                <?php for ($i = 0; $i <= 14; $i++): ?>
                                    <option value="<?= $i ?>"><?= $i ?></option>
                                <?php endfor; ?>
                            </select>
                        </div>
                        <p><small class="ingredients"><?= $item['ingredients'] ?></small></p>
                    </article>
                <?php } endforeach; ?>
            </section>
        <?php endif; ?>
    <?php endforeach; ?>
</div>

 
 
 
 
 
